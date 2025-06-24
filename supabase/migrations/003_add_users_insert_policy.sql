-- Add INSERT policy for users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can insert their own profile'
    ) THEN
        CREATE POLICY "Users can insert their own profile" ON public.users
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = id);
    END IF;
END
$$;