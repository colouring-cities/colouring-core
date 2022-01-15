-- equivalent to 015 migration
INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
-- order
('U14X','Unclassified buildings','order',NULL,True);


-- equivalent to 016 migration
INSERT INTO reference_tables.buildings_landuse_order
(landuse_id, description)
VALUES
-- order
('U14X','Unclassified buildings');


-- equivalent to 015 migration
INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
-- group
('U072X','Unclassified, likely residential','group','U14X',True);


-- equivalent to 016 migration
INSERT INTO reference_tables.buildings_landuse_group
(landuse_id, description, parent_order_id)
VALUES
-- group
('U072X','Unclassified, likely residential','U14X');
