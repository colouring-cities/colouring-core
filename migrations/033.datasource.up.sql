-- add new table that is linked to buildings by datasource
CREATE TABLE IF NOT EXISTS datasources (
    datasource_id INT PRIMARY KEY,
    description varchar(100)
);

-- add the datasource types
INSERT INTO datasources (datasource_id, description)
VALUES (0, "Crowdsourced edits");
INSERT INTO datasources (datasource_id, description)
VALUES (1, "Government data");
INSERT INTO datasources (datasource_id, description)
VALUES (2, "Data released by organisations other than government");
INSERT INTO datasources (datasource_id, description)
VALUES (3, "Inferences from computational methods");
INSERT INTO datasources (datasource_id, description)
VALUES (4, "Live streamed sources");

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS datasource_id INT DEFAULT 0;
