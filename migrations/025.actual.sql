INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
('U15X','Unclassified, presumed non-residential','order',NULL,True);
INSERT INTO reference_tables.buildings_landuse_order
(landuse_id, description)
VALUES
('U15X','Unclassified, presumed non-residential');

INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
('U073X','Unclassified, presumed non-residential','group','U15X',True);
INSERT INTO reference_tables.buildings_landuse_group
(landuse_id, description, parent_order_id)
VALUES
('U073X','Unclassified, presumed non-residential', 'U15X');

UPDATE buildings
SET current_landuse_order = 'Unclassified, presumed non-residential'
WHERE current_landuse_order = 'Unclassified buildings';

DELETE FROM reference_tables.landuse_classifications
WHERE landuse_id='U14X';

DELETE FROM reference_tables.buildings_landuse_order
WHERE landuse_id='U14X';

DELETE FROM reference_tables.landuse_classifications
WHERE landuse_id='U072X';

DELETE FROM reference_tables.buildings_landuse_group
WHERE landuse_id='U072X';
