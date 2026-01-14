-- 1. Create the new ENUM for Scope (Personal/Team)
DO $$ BEGIN
    CREATE TYPE project_owner_type AS ENUM ('PERSONAL', 'TEAM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add the new 'project_category' column using the EXISTING 'project_type' ENUM
-- We assume 'project_type' enum already exists and contains the ML categories (Klasifikasi Citra, etc.)
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_category project_type;

-- 3. Migrate existing data: Since 'type' currently holds the ML category, copy it to 'project_category'
UPDATE public.projects 
SET project_category = type::text::project_type 
WHERE type IS NOT NULL;

-- 4. Now alter the 'type' column to be the new 'project_owner_type' (Scope)
-- We cannot automatically determine PERSONAL vs TEAM from the ML category, so we default to 'PERSONAL'
-- We must drop the default first if strictly casting, or just use USING clause.
ALTER TABLE public.projects 
  ALTER COLUMN type DROP DEFAULT,
  ALTER COLUMN type TYPE project_owner_type USING 'PERSONAL'::project_owner_type,
  ALTER COLUMN type SET DEFAULT 'PERSONAL';

-- 5. Optional: Ensure project_category is not null if required
-- ALTER TABLE public.projects ALTER COLUMN project_category SET NOT NULL;
