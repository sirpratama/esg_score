# ESGku - Sustainability Made Simple

An intelligent ESG (Environmental, Social, Governance) scoring platform designed for UMKM (Usaha Mikro, Kecil, dan Menengah) businesses to assess and improve their sustainability performance.

## 🌟 Features

### Core Functionality
- **Intelligent PDF Processing**: Upload business documents (bills, reports, licenses) and let AI extract ESG-relevant data
- **Real-time ESG Scoring**: Get instant scores across Environmental, Social, and Governance categories
- **Interactive Dashboard**: Track your ESG progress with detailed analytics and insights
- **Document Analysis**: Support for electricity bills, water bills, employee records, tax documents, and more
- **Multi-category Assessment**: Comprehensive evaluation across all ESG dimensions

### Smart Features
- **AI-Powered Data Extraction**: Uses Google Gemini AI to parse and understand document content
- **Automated Scoring**: Calculates ESG scores based on extracted data and industry standards
- **Progress Tracking**: Monitor improvement over time with submission history
- **Actionable Insights**: Get recommendations to improve your ESG performance

## 🛠️ Technology Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

**Backend & Services:**
- Supabase (Database, Authentication, Storage)
- Google Gemini AI API (Document processing)
- PDF parsing capabilities

**Development Tools:**
- ESLint for code quality
- PostCSS for CSS processing
- Modern JavaScript (ES6+)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google AI API key

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd esg_score
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

4. **Database Setup:**
- Go to your Supabase SQL Editor
- Run the SQL script from `src/services/supabaseSetup.sql`
- This creates necessary tables and Row Level Security policies

5. **Start Development Server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Setup Guides

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run the database setup script in SQL Editor

### Google Gemini API Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in and create a new API key
3. Add the key to your environment variables

## 🎯 Usage

### For Businesses (UMKM)
1. **Register/Login**: Create an account or sign in
2. **Upload Documents**: Submit your business documents (bills, licenses, reports)
3. **Get ESG Score**: Receive automated scoring across E, S, and G categories
4. **Track Progress**: Monitor improvements over time
5. **Get Insights**: Receive actionable recommendations

### Document Types Supported
- **Environmental**: Electricity bills, water bills, transport/fuel receipts
- **Social**: Employee records, health insurance documents, community engagement reports
- **Governance**: Business licenses, tax documents, ownership structure documents

## 🏗️ Project Structure

```
esg_score/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, cards, inputs)
│   │   └── Navbar.jsx      # Navigation component
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── ReportForm.jsx  # ESG data submission form
│   │   ├── ESGResults.jsx  # Results display
│   │   └── Auth pages...   # Login, Register, Profile
│   ├── services/           # API and business logic
│   │   ├── geminiService.js      # AI document processing
│   │   ├── esgScoringService.js  # ESG calculation logic
│   │   └── esgDataService.js     # Data management
│   └── assets/             # Static assets (images, icons)
├── Documentation/
│   ├── PDF_PARSING_SETUP.md     # Detailed PDF processing setup
│   ├── ESG_DATABASE_STORAGE_GUIDE.md
│   └── ESG_RESULTS_DOCUMENTATION.md
└── Configuration files
```

## 🎨 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration. Main styling files:
- `src/index.css` - Global styles and Tailwind imports
- `tailwind.config.js` - Tailwind configuration
- Component-specific CSS files for complex layouts

### Vite Configuration
- React SWC plugin for fast refresh
- Path aliases configured in `jsconfig.json`
- Optimized build settings

## 📊 ESG Scoring Methodology

### Environmental (E) Score
- Energy consumption efficiency
- Water usage patterns
- Carbon footprint analysis
- Waste management practices

### Social (S) Score
- Employee welfare and benefits
- Community engagement
- Local sourcing practices
- Health and safety measures

### Governance (G) Score
- Business compliance and registration
- Tax payment history
- Ownership transparency
- Regulatory adherence

## 🚧 Development Workflow

1. **Feature Development**: Create feature branches from `main`
2. **Code Quality**: Follow ESLint rules and React best practices
3. **Testing**: Test features across different user scenarios
4. **Documentation**: Update relevant documentation for new features

## 🔒 Security & Privacy

- User data is protected with Supabase Row Level Security
- API keys are managed through environment variables
- All document processing respects data privacy
- Secure authentication with Supabase Auth

## 🌱 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support:
- Check the documentation in the `/docs` folder
- Review the troubleshooting guides
- Open an issue in the repository

## 📄 License

This project is available under the MIT License.

---

**Empowering UMKM businesses to achieve their ESG goals with intelligent scoring and actionable insights.** 
