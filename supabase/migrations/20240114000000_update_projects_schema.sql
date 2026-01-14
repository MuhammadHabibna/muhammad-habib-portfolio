-- Migration: Add missing columns and migrate data for Projects
-- Description: Adds project_type (renamed from type or new), type (Personal/Team), date ranges, and links.

-- 1. Rename existing 'type' to 'project_type' if it holds category data (Safe to run if column type exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'type') THEN
        -- We assume the existing 'type' column holds the Categories (Klasifikasi Citra, etc.) based on previous code.
        -- However, we want 'type' to represent PERSONAL/TEAM now.
        -- So we should rename the OLD 'type' to 'project_type'.
        ALTER TABLE projects RENAME COLUMN type TO project_type;
    END IF;
END $$;

-- 2. Add new 'type' column for PERSONAL/TEAM
ALTER TABLE projects ADD COLUMN IF NOT EXISTS type text DEFAULT 'PERSONAL';

-- 3. Ensure 'project_type' exists (if the rename didn't happen because it didn't exist)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type text;

-- 4. Add Date Range columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS start_date date;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS end_date date;

-- 5. Add Link columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url text;

-- 6. Migrate info_url to demo_url (if demo_url is empty and info_url is not)
UPDATE projects 
SET demo_url = info_url 
WHERE demo_url IS NULL AND info_url IS NOT NULL;

-- 7. Add Constraints (Optional but recommended)
-- Ensure slug is unique
CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_idx ON projects (slug);

-- 8. Comment on columns for clarity (Postgres specific)
COMMENT ON COLUMN projects.type IS 'PERSONAL or TEAM';
COMMENT ON COLUMN projects.project_type IS 'Category: Klasifikasi Citra, etc.';
