-- Create the esg_document_data table to store parsed PDF data
CREATE TABLE IF NOT EXISTS public.esg_document_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    parsed_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_esg_document_data_user_id ON public.esg_document_data(user_id);

-- Create an index on created_at for faster time-based queries
CREATE INDEX IF NOT EXISTS idx_esg_document_data_created_at ON public.esg_document_data(created_at);

-- Enable Row Level Security
ALTER TABLE public.esg_document_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own data
CREATE POLICY "Users can view their own ESG data" ON public.esg_document_data
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert their own ESG data" ON public.esg_document_data
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update their own ESG data" ON public.esg_document_data
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own data
CREATE POLICY "Users can delete their own ESG data" ON public.esg_document_data
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER handle_esg_document_data_updated_at
    BEFORE UPDATE ON public.esg_document_data
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create a table for storing ESG scores (calculated from the parsed data)
CREATE TABLE IF NOT EXISTS public.esg_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_data_id UUID REFERENCES public.esg_document_data(id) ON DELETE CASCADE,
    environmental_score INTEGER CHECK (environmental_score >= 0 AND environmental_score <= 100),
    social_score INTEGER CHECK (social_score >= 0 AND social_score <= 100),
    governance_score INTEGER CHECK (governance_score >= 0 AND governance_score <= 100),
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    score_breakdown JSONB,
    calculation_version VARCHAR(10) DEFAULT '1.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for ESG scores table
CREATE INDEX IF NOT EXISTS idx_esg_scores_user_id ON public.esg_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_esg_scores_overall_score ON public.esg_scores(overall_score DESC);

-- Enable Row Level Security for ESG scores
ALTER TABLE public.esg_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for ESG scores table
CREATE POLICY "Users can view their own ESG scores" ON public.esg_scores
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ESG scores" ON public.esg_scores
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ESG scores" ON public.esg_scores
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ESG scores" ON public.esg_scores
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for ESG scores updated_at
CREATE TRIGGER handle_esg_scores_updated_at
    BEFORE UPDATE ON public.esg_scores
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample calculation rules (this would be used by the scoring algorithm)
CREATE TABLE IF NOT EXISTS public.esg_scoring_rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rule_name VARCHAR(100) NOT NULL,
    category VARCHAR(20) CHECK (category IN ('environmental', 'social', 'governance')),
    rule_config JSONB NOT NULL,
    weight DECIMAL(3,2) CHECK (weight >= 0 AND weight <= 1),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for scoring rules updated_at
CREATE TRIGGER handle_esg_scoring_rules_updated_at
    BEFORE UPDATE ON public.esg_scoring_rules
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert default scoring rules
INSERT INTO public.esg_scoring_rules (rule_name, category, rule_config, weight) VALUES
('Electricity Consumption', 'environmental', '{"type": "consumption_based", "unit": "kWh", "thresholds": {"excellent": 500, "good": 1000, "fair": 2000}}', 0.25),
('Water Usage', 'environmental', '{"type": "consumption_based", "unit": "cubic_meters", "thresholds": {"excellent": 50, "good": 100, "fair": 200}}', 0.25),
('Carbon Footprint', 'environmental', '{"type": "emissions_based", "unit": "kg_co2", "thresholds": {"excellent": 100, "good": 500, "fair": 1000}}', 0.30),
('Waste Management', 'environmental', '{"type": "boolean", "bonus_points": 20}', 0.20),
('Employee Count', 'social', '{"type": "range_based", "thresholds": {"bonus_small": 10, "bonus_medium": 50}}', 0.20),
('Health Benefits Coverage', 'social', '{"type": "percentage_based", "thresholds": {"excellent": 0.9, "good": 0.7, "fair": 0.5}}', 0.30),
('Community Engagement', 'social', '{"type": "program_count", "thresholds": {"excellent": 3, "good": 2, "fair": 1}}', 0.25),
('Local Sourcing', 'social', '{"type": "percentage_based", "thresholds": {"excellent": 0.7, "good": 0.5, "fair": 0.3}}', 0.25),
('Business Registration', 'governance', '{"type": "boolean", "required": true}', 0.25),
('Tax Compliance', 'governance', '{"type": "compliance_status", "required": true}', 0.35),
('Ownership Transparency', 'governance', '{"type": "documentation_quality", "required": true}', 0.25),
('Regulatory Compliance', 'governance', '{"type": "compliance_percentage", "thresholds": {"excellent": 0.95, "good": 0.85, "fair": 0.75}}', 0.15)
ON CONFLICT DO NOTHING; 