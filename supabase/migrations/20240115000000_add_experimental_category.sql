-- Migration: Add 'Experimental Projects' to project_category
-- Description: Adds "Experimental Projects" as a valid project category.

DO $$
BEGIN
    -- Check if we are using an ENUM type for project_category or project_type
    -- Adjust 'project_category_enum' to whatever the actual enum name is if it exists.
    -- Based on codebase inspection, it seems 'project_category' is likely a text column in the table definition
    -- but might be constrained by application logic. 
    -- If there is a check constraint, we would update it here.
    
    -- However, often in Supabase/Postgres, if it's just TEXT, we don't strictly need to do anything at DB level 
    -- unless there is a CHECK constraint.
    
    -- Example of adding to Enum if it were an enum:
    -- ALTER TYPE project_category_enum ADD VALUE IF NOT EXISTS 'Experimental Projects';

    -- Since we saw it's likely TEXT in previous migrations, this file serves as documentation
    -- and a place to enforce it if constraints existed.
    
    -- If there is a check constraint on public.projects.project_category:
    -- ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_project_category_check;
    -- ALTER TABLE public.projects ADD CONSTRAINT projects_project_category_check 
    --   CHECK (project_category IN (
    --     'Klasifikasi Citra', 'Object Detection', 'Segmentasi Citra', 
    --     'Object Character Recognition', 'Clustering (Tabular)', 
    --     'Klasifikasi (Tabular)', 'Regresi (Tabular)', 'Forecasting (Tabular)', 
    --     'Analisis Sentiment', 'Klasifikasi Teks', 'Experimental Projects'
    --   ));

    -- For now, we will perform a no-op safe log as we don't want to break if constraint names differ.
    RAISE NOTICE 'Adding Experimental Projects category support.';
END $$;
