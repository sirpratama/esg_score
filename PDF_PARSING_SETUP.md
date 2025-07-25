# PDF Parsing with Gemini API Setup Guide

This guide will help you set up the PDF parsing functionality using Google's Gemini AI API for your ESG scoring application.

## 🔑 API Keys Required

### 1. Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Supabase Keys (Already configured)
Your Supabase keys should already be set up from the existing configuration.

## 📦 Installation

1. **Install dependencies** (already added to package.json):
```bash
npm install
```

The following packages were added:
- `@google/generative-ai`: Google's Generative AI SDK
- `pdf-parse`: For PDF text extraction (fallback)

## ⚙️ Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration (existing)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Gemini API Configuration (NEW)
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

## 🗄️ Database Setup

Run the SQL script in `src/services/supabaseSetup.sql` in your Supabase SQL editor to create the necessary tables:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabaseSetup.sql`
4. Run the script

This will create:
- `esg_document_data` table for storing parsed PDF data
- `esg_scores` table for calculated ESG scores
- `esg_scoring_rules` table for scoring configuration
- Proper Row Level Security (RLS) policies

## 🚀 How It Works

### 1. File Upload & Immediate Processing
When users upload a PDF file in the ReportForm:
- The file is immediately sent to Gemini API for analysis
- Gemini extracts structured data based on document type
- Real-time feedback shows processing status
- Extracted data summary is displayed to the user

### 2. Document Types Supported
The system recognizes these document types and extracts relevant ESG data:

**Environmental:**
- Electricity bills (consumption, costs, carbon footprint)
- Water bills (usage, conservation metrics)
- Transport/fuel bills (fuel consumption, CO2 emissions)

**Social:**
- Employee documents (headcount, demographics)
- Health insurance documents (BPJS coverage)
- Community engagement documentation

**Governance:**
- Ownership structure documents
- Business licenses and regulations
- Tax compliance documents

### 3. Data Processing Flow
```
PDF Upload → Gemini AI Analysis → JSON Extraction → Supabase Storage → ESG Scoring
```

## 🔧 Technical Implementation

### Key Files Created/Modified:

1. **`src/services/geminiService.js`** - Core Gemini API integration
2. **`src/pages/ReportForm.jsx`** - Updated with real-time PDF processing
3. **`src/pages/ReportForm.css`** - New styles for processing indicators
4. **`src/services/supabaseSetup.sql`** - Database schema

### Features Added:

- **Real-time PDF Processing**: Files are analyzed as soon as they're uploaded
- **Smart Prompts**: Different prompts for different document types
- **Processing Indicators**: Visual feedback with spinners, success/error states
- **Data Summaries**: Quick overview of extracted data
- **Error Handling**: Graceful handling of API failures
- **Structured JSON Output**: Consistent data format for ESG scoring

## 🎯 Usage Example

1. User uploads an electricity bill PDF
2. System immediately recognizes it as an "electricityBill" type
3. Gemini API receives a specialized prompt for electricity bills
4. AI extracts: consumption (kWh), costs, billing period, carbon footprint
5. Data is displayed as: "Electricity usage: 850 kWh, Amount: 1,250,000 IDR"
6. JSON data is stored in Supabase for ESG calculation

## 🔄 ESG Scoring Integration

The parsed data feeds into an ESG scoring algorithm that evaluates:

**Environmental Score (E):**
- Energy efficiency based on consumption
- Carbon footprint analysis
- Water usage patterns
- Waste management practices

**Social Score (S):**
- Employee welfare metrics
- Health benefits coverage
- Community engagement level
- Local sourcing practices

**Governance Score (G):**
- Business registration compliance
- Tax payment history
- Ownership transparency
- Regulatory adherence

## 📊 Sample Extracted Data

```json
{
  "documentType": "electricity_bill",
  "billingPeriod": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  },
  "consumption": {
    "kwhUsed": 850,
    "unit": "kWh"
  },
  "costs": {
    "totalAmount": 1250000,
    "currency": "IDR"
  },
  "carbonFootprint": {
    "co2Emissions": 425,
    "unit": "kg CO2"
  }
}
```

## 🚨 Cost Considerations

- Gemini 1.5 Pro: $0.00125 per 1K input tokens, $0.005 per 1K output tokens
- Typical PDF processing: ~500-2000 tokens depending on document complexity
- Estimated cost per document: $0.002 - $0.01 USD
- Free tier available: 15 requests per minute

## 🛠️ Troubleshooting

### Common Issues:

1. **"No API key provided"**
   - Check your `.env.local` file has `VITE_GEMINI_API_KEY`
   - Restart your development server after adding environment variables

2. **"Document processing failed"**
   - Ensure the uploaded file is a valid PDF
   - Check file size (max 2GB for Gemini API)
   - Verify API key has proper permissions

3. **"Database error"**
   - Run the SQL setup script in Supabase
   - Check that RLS policies are properly configured
   - Ensure user is authenticated

## 🔮 Future Enhancements

- **Batch Processing**: Process multiple files simultaneously
- **OCR Fallback**: Use backup OCR for image-based PDFs
- **Document Validation**: Verify document authenticity
- **Multi-language Support**: Process documents in Indonesian/English
- **Custom Scoring**: Allow businesses to customize ESG criteria

## 📝 Notes

- The system works with both text-based and image-based PDFs
- Gemini API has built-in OCR capabilities for scanned documents
- All sensitive data is processed securely and stored with proper access controls
- The scoring algorithm is transparent and can be customized per industry 