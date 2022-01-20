INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
('U14X','Unclassified buildings','order',NULL,True);
INSERT INTO reference_tables.buildings_landuse_order
(landuse_id, description)
VALUES
('U14X','Unclassified buildings');

UPDATE buildings
SET current_landuse_order = 'Unclassified buildings'
WHERE current_landuse_order = 'Unclassified, presumed residential';

DELETE FROM reference_tables.landuse_classifications
WHERE landuse_id='U15X';


DELETE FROM reference_tables.buildings_landuse_order
WHERE landuse_id='U15X';
