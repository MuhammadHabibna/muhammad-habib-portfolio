-- Migration to update project_type and ensure certificate image support

-- 1. Drop existing enum if needed (careful with existing data, mapping might be needed if preserving old values)
-- Since we are early, we can drop and recreate or alter.
-- Best practice for enum updates in Postgres implies creating a new type or adding values.
-- Given the list is completely different, we might want to change the column type to text with a check constraint for flexibility, 
-- OR strictly update the enum. Let's use text with check constraint for easier future updates, or just recreate the enum.

-- Let's recreate the enum.
ALTER TABLE public.projects ALTER COLUMN type DROP DEFAULT;
ALTER TABLE public.projects ALTER COLUMN type TYPE text USING type::text;
DROP TYPE IF EXISTS public.project_type;

CREATE TYPE public.project_type AS ENUM (
    'Klasifikasi Citra',
    'Object Detection',
    'Segmentasi Citra',
    'Object Character Recognition',
    'Clustering (Tabular)',
    'Klasifikasi (Tabular)',
    'Regresi (Tabular)',
    'Forecasting (Tabular)',
    'Analisis Sentiment',
    'Klasifikasi Teks'
);

-- Map old values to new ones or set to default
-- Assuming 'PERSONAL'/'TEAM' mapped to something or null. Let's just cast to the new type if possible, or set default.
-- For now, we'll clear the type or set to a default if data exists. 
-- UPDATE public.projects SET type = 'Klasifikasi Citra' WHERE type NOT IN (select unnest(enum_range(NULL::project_type)::text[]));

ALTER TABLE public.projects ALTER COLUMN type TYPE public.project_type USING type::public.project_type;
ALTER TABLE public.projects ALTER COLUMN type SET DEFAULT 'Klasifikasi Citra';


-- 2. Ensure certificate_image exists in certifications
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'certifications' AND column_name = 'certificate_image') THEN
        ALTER TABLE public.certifications ADD COLUMN certificate_image text;
    END IF;
END $$;
