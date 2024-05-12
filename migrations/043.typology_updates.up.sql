ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_classification text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_classification_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_classification_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_style_period text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_style_period_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_style_period_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_dynamic_classification text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_dynamic_classification_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_dynamic_classification_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_original_use text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_original_use_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_original_use_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_attachment_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS building_attachment_source_links text[];