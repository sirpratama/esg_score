import React from 'react';

export const sampleESGData = {
  esg_document_data: {
    id: "demo-id",
    created_at: new Date().toISOString(),
    parsed_data: {
      basicInfo: {
        businessName: "Green Tech Solutions",
        address: {
          alamat: "Jl. Sudirman No. 123",
          kelurahan: "Senayan",
          kecamatan1: "Kebayoran Baru",
          kecamatan2: "Jakarta Selatan",
          kabupaten: "Jakarta Selatan",
          provinsi: "DKI Jakarta",
          kodePos: "12190"
        },
        contact: {
          email: "info@greentechsolutions.com",
          phone: "+62-21-1234567"
        }
      },
      documentData: {
        electricityBill: {
          documentType: "electricity_bill",
          billingPeriod: {
            startDate: "2024-01-01",
            endDate: "2024-01-31"
          },
          consumption: {
            kwhUsed: 850,
            unit: "kWh"
          },
          costs: {
            totalAmount: 1250000,
            currency: "IDR"
          },
          customerInfo: {
            accountNumber: "1234567890",
            address: "Jl. Sudirman No. 123, Jakarta"
          },
          utilityCompany: "PLN",
          carbonFootprint: {
            co2Emissions: 425,
            unit: "kg CO2"
          }
        },
        waterBill: {
          documentType: "water_bill",
          billingPeriod: {
            startDate: "2024-01-01",
            endDate: "2024-01-31"
          },
          consumption: {
            waterUsed: 75,
            unit: "cubic meters"
          },
          costs: {
            totalAmount: 350000,
            currency: "IDR"
          },
          waterCompany: "PAM Jaya",
          conservationMetrics: {
            comparedToPreviousPeriod: "5% reduction",
            efficiencyRating: "Good"
          }
        },
        transportBill: {
          documentType: "transport_bill",
          billDate: "2024-01-15",
          transportInfo: {
            fuelType: "Gasoline",
            quantity: 200,
            unit: "liters",
            vehicleType: "Company Car"
          },
          costs: {
            totalAmount: 3200000,
            currency: "IDR",
            pricePerUnit: 16000
          },
          stationInfo: {
            name: "Shell Station",
            location: "Jakarta Selatan"
          },
          environmentalImpact: {
            estimatedCO2Emissions: 468,
            unit: "kg CO2"
          }
        },
        numEmployees: {
          documentType: "employee_data",
          reportDate: "2024-01-01",
          employeeMetrics: {
            totalEmployees: 25,
            fullTimeEmployees: 20,
            partTimeEmployees: 3,
            contractEmployees: 2
          },
          demographics: {
            genderDistribution: {
              male: 12,
              female: 13,
              other: 0
            },
            ageGroups: {
              under25: 5,
              "25to40": 15,
              "41to55": 4,
              over55: 1
            }
          },
          departments: [
            { name: "Engineering", employeeCount: 12 },
            { name: "Sales", employeeCount: 6 },
            { name: "Administration", employeeCount: 4 },
            { name: "Operations", employeeCount: 3 }
          ]
        },
        employeesHealth: {
          documentType: "employee_health_benefits",
          coveragePeriod: {
            startDate: "2024-01-01",
            endDate: "2024-12-31"
          },
          healthBenefits: {
            bpjsKetenagakerjaan: {
              covered: true,
              employeesCovered: 25,
              contributionAmount: 2500000
            },
            bpjsKesehatan: {
              covered: true,
              employeesCovered: 25,
              contributionAmount: 3750000
            },
            privateInsurance: {
              covered: true,
              insuranceProvider: "Allianz",
              employeesCovered: 25
            }
          },
          safetyPrograms: [
            { programName: "Workplace Safety Training", participantCount: 25 },
            { programName: "Health Screening", participantCount: 25 }
          ],
          costs: {
            totalHealthcareCosts: 8500000,
            currency: "IDR"
          }
        },
        communityEngagement: {
          documentType: "community_engagement",
          reportPeriod: {
            startDate: "2024-01-01",
            endDate: "2024-12-31"
          },
          communityPrograms: [
            {
              programName: "Digital Literacy for Local SMEs",
              description: "Teaching digital skills to local small businesses",
              beneficiaries: 50,
              investmentAmount: 15000000,
              impactMeasures: "50 businesses trained, 80% reported improved efficiency"
            },
            {
              programName: "Environmental Education in Schools",
              description: "Sustainability workshops for students",
              beneficiaries: 200,
              investmentAmount: 8000000,
              impactMeasures: "5 schools reached, environmental awareness program established"
            }
          ],
          partnerships: [
            {
              partnerName: "Local Chamber of Commerce",
              partnershipType: "Education",
              collaborationDetails: "Joint digital literacy programs"
            }
          ],
          volunteerPrograms: {
            employeeParticipation: 20,
            hoursContributed: 160,
            activitiesSupported: ["Education", "Environment", "Community Development"]
          },
          localSourcing: {
            localSuppliers: 12,
            percentageLocalPurchases: 65
          }
        },
        ownershipStructure: {
          documentType: "ownership_structure",
          documentDate: "2024-01-01",
          companyInfo: {
            legalName: "PT Green Tech Solutions Indonesia",
            businessRegistrationNumber: "8120202401230001",
            incorporationDate: "2020-03-15"
          },
          ownership: [
            {
              ownerName: "Ahmad Wijaya",
              ownershipPercentage: 60,
              ownerType: "individual",
              votingRights: 60
            },
            {
              ownerName: "Sari Kusuma",
              ownershipPercentage: 40,
              ownerType: "individual",
              votingRights: 40
            }
          ],
          boardOfDirectors: [
            {
              name: "Ahmad Wijaya",
              position: "CEO",
              independentDirector: false
            },
            {
              name: "Sari Kusuma",
              position: "CTO",
              independentDirector: false
            }
          ],
          corporateStructure: {
            businessType: "Limited Liability Company (PT)",
            subsidiaries: [],
            parentCompany: null
          }
        },
        businessRegulation: {
          documentType: "business_regulation",
          documentDate: "2024-01-01",
          licenses: [
            {
              licenseType: "Business License (NIB)",
              licenseNumber: "1234567890123456",
              issuingAuthority: "OSS (Online Single Submission)",
              issueDate: "2020-03-20",
              expiryDate: "2025-03-20",
              status: "active"
            },
            {
              licenseType: "Tax Registration (NPWP)",
              licenseNumber: "12.345.678.9-012.000",
              issuingAuthority: "Tax Office",
              issueDate: "2020-03-25",
              expiryDate: "Permanent",
              status: "active"
            }
          ],
          certifications: [
            {
              certificationType: "ISO 9001:2015",
              certifyingBody: "Bureau Veritas",
              certificateNumber: "ID-QMS-2023-001",
              validFrom: "2023-01-01",
              validTo: "2026-01-01"
            }
          ],
          complianceStatus: {
            environmentalCompliance: "Compliant",
            laborCompliance: "Compliant",
            safetyCompliance: "Compliant"
          },
          regulatoryRequirements: [
            {
              requirement: "Annual Tax Filing",
              complianceStatus: "compliant",
              lastAuditDate: "2024-03-15"
            },
            {
              requirement: "Labor Standards Compliance",
              complianceStatus: "compliant",
              lastAuditDate: "2023-12-10"
            }
          ]
        },
        taxCompliance: {
          documentType: "tax_compliance",
          taxYear: "2023",
          taxIdentificationNumber: "12.345.678.9-012.000",
          taxFilings: [
            {
              taxType: "Corporate Income Tax",
              filingDate: "2024-03-30",
              taxPeriod: "2023",
              taxAmount: 125000000,
              status: "filed"
            }
          ],
          taxPayments: {
            totalTaxPaid: 125000000,
            currency: "IDR",
            paymentStatus: "current",
            lastPaymentDate: "2024-03-30"
          },
          auditHistory: [
            {
              auditDate: "2023-06-15",
              auditType: "Regular Audit",
              outcome: "No issues found",
              adjustmentsRequired: false
            }
          ],
          complianceRating: "Excellent"
        }
      }
    }
  },
  esg_scores: {
    id: "demo-score-id",
    environmental_score: 78,
    social_score: 85,
    governance_score: 82,
    overall_score: 81,
    score_breakdown: {
      environmental: {
        electricity: 75,
        water: 80,
        transport: 70,
        waste: 85
      },
      social: {
        employment: 85,
        health: 90,
        community: 80,
        diversity: 85
      },
      governance: {
        ownership: 85,
        compliance: 80,
        tax: 85,
        transparency: 80
      }
    },
    created_at: new Date().toISOString()
  }
};

export default sampleESGData; 