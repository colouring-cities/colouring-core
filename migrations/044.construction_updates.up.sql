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

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_roof_covering_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_roof_covering_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_decorative_features boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_decorative_feature_materials text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_decorative_feature_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_decorative_feature_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_internal_wall text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_internal_wall_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_internal_wall_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_external_wall text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_external_wall_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_external_wall_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_ground_floor text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_ground_floor_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_ground_floor_source_links text[];