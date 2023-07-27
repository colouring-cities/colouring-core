ALTER TABLE buildings DROP COLUMN IF EXISTS construction_structural_system;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_structural_system_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_structural_system_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS construction_foundation;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_foundation_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_foundation_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS construction_roof_shape;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_roof_shape_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_roof_shape_source_links;

ALTER TABLE buildings DROP COLUMN IF EXISTS construction_irregularities;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_irregularities_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS construction_irregularities_source_links;


