ALTER TABLE buildings
ADD column past_buildings JSONB DEFAULT '[]'::JSONB;

-- INSERT INTO building_attribute_json_schemas (column_name, json_schema)
-- VALUES ('past_buildings', 
-- ""
-- )