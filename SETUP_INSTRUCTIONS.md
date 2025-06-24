# Database Setup Instructions

To fix the permission errors, you need to run these SQL commands in your Supabase SQL editor:

## 1. Go to Supabase Dashboard
- Visit https://supabase.com/dashboard
- Navigate to your project: nhjvglayceginquswuld
- Go to "SQL Editor"

## 2. Run this SQL to create the schema:

```sql
-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.delivery_addresses CASCADE;
DROP TABLE IF EXISTS public.survey_responses CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create users table
CREATE TABLE public.users (
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

-- Create survey_responses table
CREATE TABLE public.survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    form_id TEXT NOT NULL,
    form_title TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    responses JSONB NOT NULL DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create delivery_addresses table
CREATE TABLE public.delivery_addresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    cep TEXT,
    address TEXT NOT NULL,
    number TEXT,
    complement TEXT,
    neighborhood TEXT,
    city TEXT,
    state TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_cpf ON public.users(cpf);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_is_active ON public.users(is_active);

CREATE INDEX idx_survey_responses_user_id ON public.survey_responses(user_id);
CREATE INDEX idx_survey_responses_form_id ON public.survey_responses(form_id);
CREATE INDEX idx_survey_responses_submitted_at ON public.survey_responses(submitted_at);

CREATE INDEX idx_delivery_addresses_user_id ON public.delivery_addresses(user_id);
CREATE INDEX idx_delivery_addresses_is_default ON public.delivery_addresses(is_default);

-- Disable Row Level Security for custom authentication
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_addresses DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.users TO authenticated, anon;
GRANT ALL ON public.survey_responses TO authenticated, anon;
GRANT ALL ON public.delivery_addresses TO authenticated, anon;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER set_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();

CREATE TRIGGER set_survey_responses_updated_at
    BEFORE UPDATE ON public.survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();

CREATE TRIGGER set_delivery_addresses_updated_at
    BEFORE UPDATE ON public.delivery_addresses
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();
```

## 3. After running the SQL:
- Refresh your browser
- Try to register a new user
- The authentication should now work properly

## Notes:
- Row Level Security is disabled for simplicity with custom authentication
- In production, you should implement proper security policies
- Passwords are stored in plain text for demo - hash them in production