-- note that you need to somehow reclassify such buildings, if present - before downgrading
DELETE FROM reference_tables.landuse_classifications WHERE landuse_id = 'U071X';
DELETE FROM reference_tables.buildings_landuse_group WHERE landuse_id = 'U071X';
