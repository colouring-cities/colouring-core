ALTER TABLE buildings
ADD column demolished_buildings JSONB DEFAULT '[]'::JSONB;