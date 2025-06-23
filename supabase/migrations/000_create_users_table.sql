-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'REGISTERED' CHECK (role IN ('VISITOR', 'REGISTERED', 'SUBSCRIBED', 'ADMIN')),
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    preferences JSONB DEFAULT '{}',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role = 'ADMIN'
        )
    );

-- Admins can update all users
CREATE POLICY "Admins can update all users" ON public.users
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role = 'ADMIN'
        )
    );

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