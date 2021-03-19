ALTER TABLE buildings
ADD COLUMN dynamics_has_demolished_buildings BOOLEAN;


UPDATE buildings
SET dynamics_has_demolished_buildings = TRUE
WHERE jsonb_array_length(demolished_buildings) > 0;