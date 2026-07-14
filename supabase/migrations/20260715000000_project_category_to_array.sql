-- Migration: Convert projects.project_category from scalar text to text[]
-- Reason: the admin form and public filter only ever supported selecting a single
-- category per project. Projects can legitimately belong to multiple categories,
-- so this migration widens the column to an array without losing existing data.
--
-- Discovered via live-DB diagnostics: a CHECK constraint `check_project_category`
-- pins project_category to a fixed scalar list. It must be dropped before the
-- ALTER COLUMN TYPE (Postgres tries to re-validate the old constraint against the
-- new array type, which errors with "operator does not exist: text[] = text"),
-- then recreated against the new, deduped, extended category list using ANY() over
-- the array.
--
-- Note: this migration does NOT touch the `type` / `project_type` columns left over
-- from earlier migration history (20240114000000_update_projects_schema.sql). Verify
-- against the live DB (select column_name from information_schema.columns where
-- table_name = 'projects') whether `project_type` is still present and unused before
-- dropping it separately.

ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS check_project_category;

ALTER TABLE public.projects
  ALTER COLUMN project_category TYPE text[]
  USING CASE WHEN project_category IS NULL THEN NULL ELSE ARRAY[project_category] END;

ALTER TABLE public.projects
  ALTER COLUMN project_category SET DEFAULT ARRAY[]::text[];

ALTER TABLE public.projects
  ADD CONSTRAINT check_project_category CHECK (
    project_category <@ ARRAY[
      'Klasifikasi Citra',
      'Object Detection',
      'Segmentasi Citra',
      'Object Character Recognition',
      'Clustering (Tabular)',
      'Klasifikasi (Tabular)',
      'Regresi (Tabular)',
      'Forecasting (Tabular)',
      'Analisis Sentiment',
      'Klasifikasi Teks',
      'Web Application',
      'Web Dashboard / Analytics',
      'Experimental Projects'
    ]::text[]
  );
