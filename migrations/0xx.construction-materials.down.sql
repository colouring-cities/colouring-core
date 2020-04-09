
ALTER TABLE buildings DROP COLUMN IF EXISTS core_materials;
ALTER TABLE buildings DROP COLUMN IF EXISTS secondary_materials;
ALTER TABLE buildings DROP COLUMN IF EXISTS roof_covering;


DROP TYPE IF EXISTS construction_materials;
DROP TYPE IF EXISTS roof_covering;