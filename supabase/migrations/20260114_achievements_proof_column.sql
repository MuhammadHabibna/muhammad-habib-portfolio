-- Add proof_image_url and caption to achievements table
ALTER TABLE public.achievements 
ADD COLUMN IF NOT EXISTS proof_image_url text,
ADD COLUMN IF NOT EXISTS proof_image_caption text;

-- Ensure RLS policies for storage objects in 'portfolio' bucket (or 'PORTFOLIO')
-- Note: You might need to adjust bucket name if it differs in your project
-- This is a generic policy example for storage.objects
-- CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
-- CREATE POLICY "Allow public read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'portfolio');
