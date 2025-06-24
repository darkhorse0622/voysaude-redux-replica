-- Create delivery_addresses table
CREATE TABLE IF NOT EXISTS public.delivery_addresses (
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_delivery_addresses_user_id ON public.delivery_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_delivery_addresses_is_default ON public.delivery_addresses(is_default);

-- Disable Row Level Security for custom authentication
ALTER TABLE public.delivery_addresses DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.delivery_addresses TO authenticated;
GRANT ALL ON public.delivery_addresses TO anon;

-- Create updated_at trigger
CREATE TRIGGER set_delivery_addresses_updated_at
    BEFORE UPDATE ON public.delivery_addresses
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_updated_at();