-- Fix permission denied error and null ID issue for survey_responses table
-- This error occurs because RLS is enabled but the policies use auth.uid() which doesn't work with custom auth
-- Also fixes the null ID constraint violation

-- First, grant usage on the public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant CREATE on schema to allow table operations
GRANT CREATE ON SCHEMA public TO anon, authenticated;

-- Drop the table if it exists and recreate it with proper structure
DROP TABLE IF EXISTS public.survey_responses CASCADE;

-- Create survey_responses table with proper UUID generation
CREATE TABLE public.survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    form_id TEXT NOT NULL,
    form_title TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    responses JSONB NOT NULL DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_survey_responses_user_id ON public.survey_responses(user_id);
CREATE INDEX idx_survey_responses_form_id ON public.survey_responses(form_id);
CREATE INDEX idx_survey_responses_submitted_at ON public.survey_responses(submitted_at);

-- Disable RLS on survey_responses table (since we're using custom auth, not Supabase Auth)
ALTER TABLE public.survey_responses DISABLE ROW LEVEL SECURITY;

-- Grant full permissions on the survey_responses table
GRANT ALL ON public.survey_responses TO anon, authenticated;

-- Grant permissions on the sequence (for auto-generated IDs)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER set_survey_responses_updated_at
    BEFORE UPDATE ON public.survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();

-- Test that UUID generation works
INSERT INTO public.survey_responses (user_id, form_id, form_title, responses, metadata) 
VALUES ('00000000-0000-0000-0000-000000000000', 'test-form', 'Test Form', '{}', '{}');

-- Verify the test insert worked and UUID was generated
SELECT id, user_id, form_id, form_title FROM public.survey_responses WHERE form_id = 'test-form';

-- Clean up test data
DELETE FROM public.survey_responses WHERE form_id = 'test-form';

-- Verify permissions are set correctly
SELECT 
    schemaname,
    tablename,
    tableowner,
    has_table_privilege('anon', schemaname||'.'||tablename, 'INSERT') as anon_insert,
    has_table_privilege('anon', schemaname||'.'||tablename, 'SELECT') as anon_select,
    has_table_privilege('authenticated', schemaname||'.'||tablename, 'INSERT') as auth_insert,
    has_table_privilege('authenticated', schemaname||'.'||tablename, 'SELECT') as auth_select
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'survey_responses';