-- Fix survey_responses permissions
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "survey_responses_insert_policy" ON public.survey_responses;
DROP POLICY IF EXISTS "survey_responses_select_policy" ON public.survey_responses;
DROP POLICY IF EXISTS "survey_responses_update_policy" ON public.survey_responses;

-- Ensure RLS is disabled (should already be disabled from previous migration)
ALTER TABLE public.survey_responses DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to authenticated and anon users
GRANT ALL PRIVILEGES ON public.survey_responses TO authenticated;
GRANT ALL PRIVILEGES ON public.survey_responses TO anon;
GRANT ALL PRIVILEGES ON public.survey_responses TO postgres;

-- Grant usage on the sequence if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.sequences WHERE sequence_name = 'survey_responses_id_seq') THEN
        GRANT USAGE, SELECT ON SEQUENCE public.survey_responses_id_seq TO authenticated;
        GRANT USAGE, SELECT ON SEQUENCE public.survey_responses_id_seq TO anon;
        GRANT USAGE, SELECT ON SEQUENCE public.survey_responses_id_seq TO postgres;
    END IF;
END $$;

-- Grant schema permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT CREATE ON SCHEMA public TO authenticated;
GRANT CREATE ON SCHEMA public TO anon;