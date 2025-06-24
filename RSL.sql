-- Enable RLS on the survey_responses table
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own survey responses
CREATE POLICY "Users can insert their own survey responses" ON survey_responses
FOR INSERT WITH CHECK (auth.uid() = user_id::uuid);

-- Allow users to read their own survey responses
CREATE POLICY "Users can view their own survey responses" ON survey_responses
FOR SELECT USING (auth.uid() = user_id::uuid);

-- Allow users to update their own survey responses (if needed)
CREATE POLICY "Users can update their own survey responses" ON survey_responses
FOR UPDATE USING (auth.uid() = user_id::uuid);