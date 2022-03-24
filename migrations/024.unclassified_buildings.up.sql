-- note that you need to somehow reclassify such buildings, if present - before downgrading

-- equivalent to 015 migration
INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
-- order
('U15X','Unclassified, presumed non-residential','order',NULL,True);


-- equivalent to 016 migration
INSERT INTO reference_tables.buildings_landuse_order
(landuse_id, description)
VALUES
-- order
('U15X','Unclassified, presumed non-residential');


-- equivalent to 015 migration
INSERT INTO reference_tables.landuse_classifications
(landuse_id, description, level, parent_id, is_used)
VALUES
-- group
('U073X','Unclassified, presumed non-residential','group','U15X',True);


-- equivalent to 016 migration
INSERT INTO reference_tables.buildings_landuse_group
(landuse_id, description, parent_order_id)
VALUES
-- group
('U073X','Unclassified, presumed non-residential','U15X');
