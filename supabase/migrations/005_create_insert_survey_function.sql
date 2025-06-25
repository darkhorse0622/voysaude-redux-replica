CREATE TABLE survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    form_id TEXT NOT NULL,
    form_title TEXT,
    submitted_at TIMESTAMPTZ NOT NULL,
    responses JSONB NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_survey_responses_user_id ON survey_responses(user_id);
CREATE INDEX idx_survey_responses_form_id ON survey_responses(form_id);
CREATE INDEX idx_survey_responses_submitted_at ON survey_responses(submitted_at);

-- Enable RLS (Row Level Security)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Add policies for authenticated users
CREATE POLICY "Users can insert their own survey responses" ON survey_responses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own survey responses" ON survey_responses
    FOR SELECT USING (auth.uid() = user_id);