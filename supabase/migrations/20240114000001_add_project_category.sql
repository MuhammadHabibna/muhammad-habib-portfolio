-- Add project_category column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_category text;

-- Add check constraint to restrict values
ALTER TABLE public.projects 
ADD CONSTRAINT check_project_category 
CHECK (project_category IN (
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
));

-- Optional: Migrate existing data if needed (e.g., if you were storing category in 'type' previously and want to move it)
-- UPDATE public.projects SET project_category = type WHERE type IN (...);
-- However, given 'type' is supposed to be PERSONAL/TEAM, we assume category data might be missing or mixed.
-- We will leave it nullable for now or you can set a default.
