-- Enable RLS on certifications table
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- 1. SELECT: Allow everyone to read certifications (or strict to published if preferred, but user said "authenticated: true", implying open read for auth at least. Let's make it open for all for the portfolio).
CREATE POLICY "Enable read access for all users" ON public.certifications
    FOR SELECT
    USING (true);

-- 2. INSERT: Allow admins to insert
CREATE POLICY "Enable insert for admins" ON public.certifications
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admins WHERE user_id = auth.uid()
        )
    );

-- 3. UPDATE: Allow admins to update
CREATE POLICY "Enable update for admins" ON public.certifications
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins WHERE user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admins WHERE user_id = auth.uid()
        )
    );

-- 4. DELETE: Allow admins to delete
CREATE POLICY "Enable delete for admins" ON public.certifications
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins WHERE user_id = auth.uid()
        )
    );
