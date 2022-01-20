INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
('U15X','Unclassified, presumed residential','order',NULL,True);
INSERT INTO reference_tables.buildings_landuse_order
(landuse_id, description)
VALUES
('U15X','Unclassified, presumed residential');

UPDATE buildings
SET current_landuse_order = 'Unclassified, presumed residential'
WHERE current_landuse_order = 'Unclassified buildings';

DELETE FROM reference_tables.landuse_classifications
WHERE landuse_id='U14X';


DELETE FROM reference_tables.buildings_landuse_order
WHERE landuse_id='U14X';
