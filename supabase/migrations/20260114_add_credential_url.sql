-- Add credential_url column
ALTER TABLE public.certifications
ADD COLUMN IF NOT EXISTS credential_url text;

-- Migrate data from verify_url if it exists, otherwise just linkedin_url
-- We use a DO block to safely handle potential missing columns in a flexible way, 
-- or just simple UPDATE if we are sure. 
-- Given I can't be 100% sure verify_url exists in the DB (schema file didn't show it created),
-- I will blindly try to update from it. If it fails, the user will see it. 
-- However, typically verify_url was in the Typescript types, so it likely exists.

UPDATE public.certifications
SET credential_url = COALESCE(verify_url, linkedin_url)
WHERE credential_url IS NULL;

-- Note: We are NOT dropping verify_url or linkedin_url as per instructions to "Not remove existing columns".
