# ESG PDF Parsing - Troubleshooting Guide

If you're getting errors when submitting your ESG report, follow these steps to diagnose and fix the issue.

## 🔍 Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Upload files and try to submit
4. Look for error messages in red

## ⚠️ Common Error Messages & Solutions

### "VITE_GEMINI_API_KEY is not set in environment variables"

**Problem**: Missing Gemini API key

**Solution**:
1. Create a `.env.local` file in your project root
2. Add: `VITE_GEMINI_API_KEY=your_actual_api_key_here`
3. Get your API key from: https://makersuite.google.com/app/apikey
4. Restart your development server (`npm run dev`)

### "Database tables not found. Please run the setup SQL script"

**Problem**: Database tables haven't been created

**Solution**:
1. Go to your Supabase dashboard
2. Click on "SQL Editor"
3. Copy the contents of `src/services/supabaseSetup.sql`
4. Paste and run the SQL script
5. Refresh the page and try again

### "Invalid or missing Gemini API key"

**Problem**: API key is incorrect or expired

**Solution**:
1. Verify your API key at: https://makersuite.google.com/app/apikey
2. Generate a new API key if needed
3. Update your `.env.local` file
4. Restart the development server

### "Network error. Please check your internet connection"

**Problem**: Connection issues

**Solution**:
1. Check your internet connection
2. Try refreshing the page
3. Check if your firewall is blocking the requests
4. Try a different network if possible

### "File must be a PDF"

**Problem**: Wrong file type uploaded

**Solution**:
1. Ensure you're uploading `.pdf` files only
2. Check the file extension is correct
3. Try converting other formats to PDF first

### "File too large. Maximum size is 20MB"

**Problem**: PDF file is too big

**Solution**:
1. Compress your PDF using online tools
2. Split large PDFs into smaller files
3. Reduce image quality in the PDF

## 🧪 Step 2: Test Your Setup

Add this temporary diagnostic code to test your configuration:

### Test Gemini API Connection

Open your browser console and run:

```javascript
// Test if API key is set
console.log('API Key set:', !!import.meta.env.VITE_GEMINI_API_KEY);

// Test Supabase connection
import { supabase } from './supabaseClient.js';
supabase.from('esg_document_data').select('id').limit(1)
  .then(result => console.log('Database test:', result))
  .catch(error => console.error('Database error:', error));
```

### Check Environment Variables

In your browser console:

```javascript
console.log('Environment variables:');
console.log('GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? 'SET' : 'NOT SET');
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
```

## 🔧 Step 3: Manual Testing

### Test 1: Small PDF Upload
1. Create a simple 1-page PDF with text
2. Upload it to any field in the form
3. Check if processing works

### Test 2: Database Connection
1. Try logging in/out to test Supabase auth
2. Check the Network tab for failed requests
3. Look for 401/403 errors (permission issues)

### Test 3: API Limits
1. Check if you've exceeded Gemini API limits
2. Wait a few minutes and try again
3. Consider upgrading your API plan if needed

## 📋 Step 4: Environment Checklist

Ensure you have:

- ✅ `.env.local` file in project root
- ✅ Valid Gemini API key
- ✅ Supabase URL and anon key
- ✅ Database tables created (run SQL script)
- ✅ Internet connection
- ✅ Valid PDF files (not scanned images)
- ✅ Development server restarted after env changes

## 🔄 Step 5: Reset & Retry

If nothing works:

1. **Clear browser cache** and localStorage
2. **Restart development server**: Stop and run `npm run dev`
3. **Check for typos** in your `.env.local` file
4. **Try a different browser** or incognito mode
5. **Check API quotas** on Google AI Studio

## 📞 Getting More Help

If you're still stuck:

1. **Check console logs** - they contain detailed error information
2. **Try with a simple text-based PDF** first
3. **Verify all API keys** are correct and active
4. **Test internet connectivity** to API endpoints

## 🚨 Emergency Bypass

If you need to test without PDF processing, temporarily modify `ReportForm.jsx`:

```javascript
// Comment out PDF processing for testing
// const result = await parsePDFWithGemini(file, documentType);

// Use mock data instead
const result = {
  success: true,
  data: { documentType: documentType, testData: "mock" }
};
```

This will help isolate whether the issue is with PDF processing or other parts of the system.

## 📊 Success Indicators

You'll know everything is working when you see:

- ✅ "Processing... Analyzing document with AI..." message
- ✅ "Document processed successfully!" with data summary
- ✅ "ESG Analysis Complete!" with scores
- ✅ No red error messages in console
- ✅ Successful redirect to rating page

## 🎯 Final Test

The complete flow should work like this:

1. **Upload PDF** → See "Analyzing document with AI..."
2. **Wait 5-10 seconds** → See "Document processed successfully!"
3. **Click Submit** → See "Calculating ESG scores..."
4. **Wait 2-3 seconds** → See "ESG Analysis Complete!"
5. **Automatic redirect** → Go to rating page

If any step fails, use the console logs to identify exactly where the problem occurs. 