CREATE TYPE building_residential_typology_description
AS ENUM ('Single-storey house',
    'Bungalow',
    'Multi-storey house',
    'Maisonette',
    'Flat');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS building_residential_typology_description building_residential_typology_description;
