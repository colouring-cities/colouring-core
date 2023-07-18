ALTER TABLE buildings DROP COLUMN IF EXISTS typology_classification;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_classification_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_classification_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS typology_style_period;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_style_period_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_style_period_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS typology_dynamic_classification;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_dynamic_classification_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_dynamic_classification_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS typology_original_use;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_original_use_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS typology_original_use_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS building_attachment_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS building_attachment_source_links;
