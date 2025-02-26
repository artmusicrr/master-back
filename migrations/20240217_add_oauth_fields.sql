-- Add OAuth2 related columns to users table
ALTER TABLE public.users 
ADD COLUMN oauth_provider VARCHAR(50) NULL,
ADD COLUMN oauth_id VARCHAR(255) NULL;

-- Optional: Add a unique constraint to prevent duplicate OAuth IDs
ALTER TABLE public.users 
ADD CONSTRAINT unique_oauth_id UNIQUE (oauth_provider, oauth_id);
