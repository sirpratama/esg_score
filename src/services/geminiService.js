import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key is available
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
  }
});

/**
 * Test API connection
 */
export const testGeminiConnection = async () => {
  try {
    if (!apiKey) {
      return { success: false, error: 'Gemini API key not configured' };
    }
    
    // Simple test with minimal input
    const result = await model.generateContent(['Test connection. Respond with: {"status": "connected"}']);
    const response = await result.response;
    return { success: true, message: 'Gemini API connected successfully' };
  } catch (error) {
    console.error('Gemini API test failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Convert file to base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

/**
 * Parse PDF content using Gemini API and extract structured data
 */
export const parsePDFWithGemini = async (file, documentType) => {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env.local file');
    }

    if (!file) {
      throw new Error('No file provided');
    }

    console.log(`Processing ${documentType}:`, file.name, `(${file.size} bytes)`);

    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('File must be a PDF');
    }

    // Check file size (Gemini has limits)
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      throw new Error('File too large. Maximum size is 20MB');
    }

    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    // Create the prompt based on document type
    const prompt = createPromptForDocumentType(documentType);
    
    // Prepare the content for Gemini
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: file.type || 'application/pdf'
      }
    };

    console.log(`Sending ${documentType} to Gemini API...`);

    // Generate content with Gemini
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const jsonText = response.text();

    console.log(`Received response for ${documentType}:`, jsonText.substring(0, 200) + '...');

    // Parse the JSON response
    try {
      const parsedData = JSON.parse(jsonText);
      console.log(`Successfully parsed JSON for ${documentType}`);
      
      return {
        success: true,
        data: parsedData,
        filename: file.name,
        documentType,
        processedAt: new Date().toISOString()
      };
    } catch (parseError) {
      console.error('JSON parsing error for', documentType, ':', parseError);
      console.error('Raw response:', jsonText);
      
      return {
        success: false,
        error: `Failed to parse JSON response: ${parseError.message}`,
        rawResponse: jsonText
      };
    }

  } catch (error) {
    console.error(`Error parsing ${documentType} with Gemini:`, error);
    
    let errorMessage = error.message || 'Failed to parse PDF';
    
    // Provide more specific error messages
    if (error.message?.includes('API_KEY')) {
      errorMessage = 'Invalid or missing Gemini API key';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'Gemini API quota exceeded. Please try again later';
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorMessage = 'Network error. Please check your internet connection';
    }
    
    return {
      success: false,
      error: errorMessage,
      documentType
    };
  }
};

/**
 * Create appropriate prompts for different document types
 */
const createPromptForDocumentType = (documentType) => {
  const prompts = {
    electricityBill: `
      Analyze this electricity bill document and extract the following information in JSON format:
      {
        "documentType": "electricity_bill",
        "billingPeriod": {
          "startDate": "YYYY-MM-DD",
          "endDate": "YYYY-MM-DD"
        },
        "consumption": {
          "kwhUsed": number,
          "unit": "kWh"
        },
        "costs": {
          "totalAmount": number,
          "currency": "string",
          "breakdown": [
            {
              "description": "string",
              "amount": number
            }
          ]
        },
        "customerInfo": {
          "accountNumber": "string",
          "address": "string"
        },
        "utilityCompany": "string",
        "carbonFootprint": {
          "co2Emissions": number,
          "unit": "kg CO2"
        }
      }
      
      If any information is not available, use null for that field. Focus on environmental impact data for ESG scoring.
    `,
    
    waterBill: `
      Analyze this water bill document and extract the following information in JSON format:
      {
        "documentType": "water_bill",
        "billingPeriod": {
          "startDate": "YYYY-MM-DD",
          "endDate": "YYYY-MM-DD"
        },
        "consumption": {
          "waterUsed": number,
          "unit": "cubic meters or liters"
        },
        "costs": {
          "totalAmount": number,
          "currency": "string",
          "breakdown": [
            {
              "description": "string",
              "amount": number
            }
          ]
        },
        "customerInfo": {
          "accountNumber": "string",
          "address": "string"
        },
        "waterCompany": "string",
        "conservationMetrics": {
          "comparedToPreviousPeriod": "string",
          "efficiencyRating": "string"
        }
      }
      
      If any information is not available, use null for that field. Focus on water conservation data for ESG scoring.
    `,
    
    transportBill: `
      Analyze this transport/fuel bill document and extract the following information in JSON format:
      {
        "documentType": "transport_bill",
        "billDate": "YYYY-MM-DD",
        "transportInfo": {
          "fuelType": "string",
          "quantity": number,
          "unit": "liters or gallons",
          "vehicleType": "string"
        },
        "costs": {
          "totalAmount": number,
          "currency": "string",
          "pricePerUnit": number
        },
        "stationInfo": {
          "name": "string",
          "location": "string"
        },
        "environmentalImpact": {
          "estimatedCO2Emissions": number,
          "unit": "kg CO2"
        }
      }
      
      If any information is not available, use null for that field. Focus on transportation emissions for ESG scoring.
    `,
    
    numEmployees: `
      Analyze this employee document and extract the following information in JSON format:
      {
        "documentType": "employee_data",
        "reportDate": "YYYY-MM-DD",
        "employeeMetrics": {
          "totalEmployees": number,
          "fullTimeEmployees": number,
          "partTimeEmployees": number,
          "contractEmployees": number
        },
        "demographics": {
          "genderDistribution": {
            "male": number,
            "female": number,
            "other": number
          },
          "ageGroups": {
            "under25": number,
            "25to40": number,
            "41to55": number,
            "over55": number
          }
        },
        "departments": [
          {
            "name": "string",
            "employeeCount": number
          }
        ]
      }
      
      If any information is not available, use null for that field. Focus on workforce diversity and employment data for ESG scoring.
    `,
    
    employeesHealth: `
      Analyze this employee health/BPJS insurance document and extract the following information in JSON format:
      {
        "documentType": "employee_health_benefits",
        "coveragePeriod": {
          "startDate": "YYYY-MM-DD",
          "endDate": "YYYY-MM-DD"
        },
        "healthBenefits": {
          "bpjsKetenagakerjaan": {
            "covered": boolean,
            "employeesCovered": number,
            "contributionAmount": number
          },
          "bpjsKesehatan": {
            "covered": boolean,
            "employeesCovered": number,
            "contributionAmount": number
          },
          "privateInsurance": {
            "covered": boolean,
            "insuranceProvider": "string",
            "employeesCovered": number
          }
        },
        "safetyPrograms": [
          {
            "programName": "string",
            "participantCount": number
          }
        ],
        "costs": {
          "totalHealthcareCosts": number,
          "currency": "string"
        }
      }
      
      If any information is not available, use null for that field. Focus on employee welfare and health benefits for ESG scoring.
    `,
    
    communityEngagement: `
      Analyze this community engagement document and extract the following information in JSON format:
      {
        "documentType": "community_engagement",
        "reportPeriod": {
          "startDate": "YYYY-MM-DD",
          "endDate": "YYYY-MM-DD"
        },
        "communityPrograms": [
          {
            "programName": "string",
            "description": "string",
            "beneficiaries": number,
            "investmentAmount": number,
            "impactMeasures": "string"
          }
        ],
        "partnerships": [
          {
            "partnerName": "string",
            "partnershipType": "string",
            "collaborationDetails": "string"
          }
        ],
        "volunteerPrograms": {
          "employeeParticipation": number,
          "hoursContributed": number,
          "activitiesSupported": ["string"]
        },
        "localSourcing": {
          "localSuppliers": number,
          "percentageLocalPurchases": number
        }
      }
      
      If any information is not available, use null for that field. Focus on community impact and social responsibility for ESG scoring.
    `,
    
    ownershipStructure: `
      Analyze this ownership structure document and extract the following information in JSON format:
      {
        "documentType": "ownership_structure",
        "documentDate": "YYYY-MM-DD",
        "companyInfo": {
          "legalName": "string",
          "businessRegistrationNumber": "string",
          "incorporationDate": "YYYY-MM-DD"
        },
        "ownership": [
          {
            "ownerName": "string",
            "ownershipPercentage": number,
            "ownerType": "individual/entity",
            "votingRights": number
          }
        ],
        "boardOfDirectors": [
          {
            "name": "string",
            "position": "string",
            "independentDirector": boolean
          }
        ],
        "corporateStructure": {
          "businessType": "string",
          "subsidiaries": ["string"],
          "parentCompany": "string"
        }
      }
      
      If any information is not available, use null for that field. Focus on corporate governance and transparency for ESG scoring.
    `,
    
    businessRegulation: `
      Analyze this business regulation/compliance document and extract the following information in JSON format:
      {
        "documentType": "business_regulation",
        "documentDate": "YYYY-MM-DD",
        "licenses": [
          {
            "licenseType": "string",
            "licenseNumber": "string",
            "issuingAuthority": "string",
            "issueDate": "YYYY-MM-DD",
            "expiryDate": "YYYY-MM-DD",
            "status": "active/expired/pending"
          }
        ],
        "certifications": [
          {
            "certificationType": "string",
            "certifyingBody": "string",
            "certificateNumber": "string",
            "validFrom": "YYYY-MM-DD",
            "validTo": "YYYY-MM-DD"
          }
        ],
        "complianceStatus": {
          "environmentalCompliance": "string",
          "laborCompliance": "string",
          "safetyCompliance": "string"
        },
        "regulatoryRequirements": [
          {
            "requirement": "string",
            "complianceStatus": "compliant/non-compliant/pending",
            "lastAuditDate": "YYYY-MM-DD"
          }
        ]
      }
      
      If any information is not available, use null for that field. Focus on regulatory compliance and business governance for ESG scoring.
    `,
    
    taxCompliance: `
      Analyze this tax compliance document and extract the following information in JSON format:
      {
        "documentType": "tax_compliance",
        "taxYear": "YYYY",
        "taxIdentificationNumber": "string",
        "taxFilings": [
          {
            "taxType": "string",
            "filingDate": "YYYY-MM-DD",
            "taxPeriod": "string",
            "taxAmount": number,
            "status": "filed/pending/overdue"
          }
        ],
        "taxPayments": {
          "totalTaxPaid": number,
          "currency": "string",
          "paymentStatus": "current/overdue",
          "lastPaymentDate": "YYYY-MM-DD"
        },
        "auditHistory": [
          {
            "auditDate": "YYYY-MM-DD",
            "auditType": "string",
            "outcome": "string",
            "adjustmentsRequired": boolean
          }
        ],
        "complianceRating": "string"
      }
      
      If any information is not available, use null for that field. Focus on tax transparency and compliance for ESG scoring.
    `,
    
    default: `
      Analyze this document and extract all relevant information in a structured JSON format. 
      Focus on information that would be useful for ESG (Environmental, Social, Governance) scoring.
      Include document type, dates, monetary amounts, quantities, and any sustainability-related metrics.
      
      Return the data in a clear JSON structure with appropriate field names and data types.
    `
  };
  
  return prompts[documentType] || prompts.default;
};

/**
 * Process multiple PDF files
 */
export const processMultiplePDFs = async (files) => {
  const results = [];
  
  for (const [documentType, file] of Object.entries(files)) {
    if (file) {
      console.log(`Processing ${documentType}:`, file.name);
      const result = await parsePDFWithGemini(file, documentType);
      results.push(result);
    }
  }
  
  return results;
};

/**
 * Save parsed data to Supabase
 */
export const saveParsedDataToSupabase = async (supabase, userId, parsedResults) => {
  try {
    console.log('Attempting to save data to Supabase for user:', userId);
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    if (!parsedResults) {
      throw new Error('No data to save');
    }

    // Test database connection first
    console.log('Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase.from('esg_document_data').select('id').limit(1);
    
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      if (testError.message?.includes('relation "public.esg_document_data" does not exist')) {
        throw new Error('Database tables not found. Please run the setup SQL script in your Supabase dashboard.');
      }
      throw new Error(`Database connection failed: ${testError.message}`);
    }
    
    console.log('Database connection successful, inserting data...');

    const { data, error } = await supabase
      .from('esg_document_data')
      .insert({
        user_id: userId,
        parsed_data: parsedResults,
        created_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Failed to save data: ${error.message}`);
    }
    
    console.log('Data saved successfully:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save data to database'
    };
  }
}; 