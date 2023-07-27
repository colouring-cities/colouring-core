ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_structural_system text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_structural_system_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_structural_system_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_foundation text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_foundation_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_foundation_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_roof_shape text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_roof_shape_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_roof_shape_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_irregularities text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_irregularities_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_irregularities_source_links text[];

