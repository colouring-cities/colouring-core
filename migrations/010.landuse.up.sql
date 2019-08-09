-- Create land use and fields

--Landuse is hierachical. Highest level is Order (Residential) then Group (Residential-Dwelling) then Class (Residential-Dwelling-Detached house)
--Fields could be linked when not mixed use Example: If user inputs class field (Detached-House) on front end then trigger on db automatically will populate group and order. If we go this route then a trigger is needed on the db both to run and remove this process.

-- Land use, single or mutiple classes?
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landuse_mutiple_use boolean DEFAULT false;

-- Land use, how many different uses?
--TODO should there be an upper limite (yes) on number of landuses in a building seems unlikley to me more than 5 (ie. Shop, office, resi but shopping center/train station could be the exception to this )
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS (landuse_number_of_uses SMALLINT CHECK (landuse_number_of_uses > 0 <= 20 ))
DEFAULT 1;

-- Land use NLUD class, this might be multiple and should match number of uses input. See page 34 of NLUD_documentation
-- Agriculture And Fisheries
-- Community Services
-- Defence
-- Forestry (not used)
-- Industry And Business
-- Minerals
-- Mixed (our definition)  
-- Recreation And Leisure
-- Residential
-- Retail
-- Transport
-- Unused Land
-- Utilities And Infrastructure
-- Vacant And Derelict

CREATE TYPE landuse_order AS ENUM (
  'Agriculture And Fisheries',
  'Community Services',
  'Defence',
  'Industry And Business',
  'Minerals',
  'Mixed use',
  'Recreation And Leisure',
  'Residential',
  'Retail',
  'Transport',
  'Utilities And Infrastructure',
  'Vacant And Derelict',
  'None'
);
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landuse_order landuse_order DEFAULT 'None';

-- Land use NLUD group, can only be one  - prepopulated if mixed. See page 34 of NLUD_documentation§
-- Example of front end autofill drop down http://jsfiddle.net/p6qnczgv/
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_group;

CREATE TYPE landuse_group AS ENUM (
'Agriculture-Agriculture And Fisheries',
'Fisheries-Agriculture And Fisheries',
'Medical and health care services-Community Services',
'Places of worship-Community Services',
'Education-Community Services',
'Community services-Community Services',
'Defence-Defence',
'Managed forest-Forestry',
'Un-managed forest-Forestry',
'Manufacturing-Industry And Business',
'Offices-Industry And Business',
'Storage-Industry And Business',
'Wholesale distribution-Industry And Business',
'Mineral workings and quarries-Minerals',
'Outdoor amenity and open spaces-Recreation And Leisure',
'Amusement and show places-Recreation And Leisure',
'Libraries, museums and galleries-Recreation And Leisure',
'Sports facilities and grounds-Recreation And Leisure',
'Holiday parks and camps-Recreation And Leisure',
'Allotments and city farms-Recreation And Leisure',
'Dwellings-Residential',
'Hotels, boarding and guest houses-Residential',
'Residential institutions-Residential',
'Shops-Retail',
'Financial and professional services-Retail',
'Restaurants and cafes-Retail',
'Public houses and bars-Retail',
'Transport tracks and ways-Transport',
'Transport terminals and interchanges-Transport',
'Car parks-Transport',
'Vehicle storage-Transport',
'Goods and freight terminals-Transport',
'Waterways-Transport',
'Unused land-Unused Land',
'Energy production and distribution-Utilities And Infrastructure',
'Water storage and treatment-Utilities And Infrastructure',
'Refuse disposal-Utilities And Infrastructure',
'Cemeteries and crematoria-Utilities And Infrastructure',
'Post and telecommunications-Utilities And Infrastructure',
'Vacant-Vacant And Derelict',
'Derelict-Vacant And Derelict',
'None',
);
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landuse_group landuse_group DEFAULT 'None';


-- Land use NLUD order, can only be one - prepopulated if mixed
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_class;
