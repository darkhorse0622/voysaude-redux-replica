-- Create survey_responses table
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    form_id TEXT NOT NULL,
    form_title TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    responses JSONB NOT NULL DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_survey_responses_user_id ON public.survey_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_form_id ON public.survey_responses(form_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_submitted_at ON public.survey_responses(submitted_at);

-- Enable Row Level Security
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own survey responses" ON public.survey_responses
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own survey responses" ON public.survey_responses
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own survey responses" ON public.survey_responses
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();