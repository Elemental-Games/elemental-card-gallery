-- Create a table for email subscribers
CREATE TABLE IF NOT EXISTS public.subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL UNIQUE,
    subscribed_at timestamp with time zone DEFAULT now(),
    unsubscribed_at timestamp with time zone DEFAULT NULL,
    is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting
CREATE POLICY insert_subscribers ON public.subscribers 
    FOR INSERT 
    TO authenticated, anon
    WITH CHECK (true);

-- Create policy to allow reading to service role only
CREATE POLICY read_subscribers ON public.subscribers 
    FOR SELECT 
    TO service_role
    USING (true);

-- Add a comment to the table
COMMENT ON TABLE public.subscribers IS 'Table to store email subscribers for the game''s newsletter';

-- Create an index on the email field for faster lookups
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON public.subscribers (email); 