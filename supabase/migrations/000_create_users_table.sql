-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth DATE,
    phone TEXT,
    cpf TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'REGISTERED' CHECK (role IN ('VISITOR', 'REGISTERED', 'SUBSCRIBED', 'ADMIN')),
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_cpf ON public.users(cpf);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- Disable Row Level Security for custom authentication
-- We'll handle permissions in the application layer
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to the authenticated role
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO anon;

-- Create storage bucket for user content if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-content', 'user-content', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own avatars" ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatars" ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view avatars" ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'user-content');