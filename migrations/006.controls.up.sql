-- Create planning and controls fields

-- Planning Portal
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_portal_link varchar DEFAULT '';

-- Conservation area (bool, name)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_conservation_area_name varchar DEFAULT '';

-- Listed (bool, list id)
-- e.g. https://historicengland.org.uk/listing/the-list/list-entry/1294614
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_list boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_list_id int DEFAULT null;

-- List category, one of:
-- - Listed Building
-- - Scheduled Monument
-- - Wreck
-- - Park and Garden
-- - Battlefield
-- - World Heritage Site
-- - Certificate of Immunity
-- - Building Preservation Notice
CREATE TYPE IF NOT EXISTS planning_list_cat AS ENUM (
    'Listed Building',
    'Scheduled Monument',
    'Wreck',
    'Park and Garden',
    'Battlefield',
    'World Heritage Site',
    'Certificate of Immunity',
    'Building Preservation Notice',
    'None'
);
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_list_cat planning_list_cat DEFAULT 'None';

-- Listing grade, for Listed Building only, one of:
-- - I
-- - II*
-- - II
CREATE TYPE IF NOT EXISTS planning_list_grade AS ENUM ('I', 'II*', 'II', 'None');
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_list_grade planning_list_grade DEFAULT 'None';

-- Heritage at risk (bool, at-risk id)
-- e.g. https://historicengland.org.uk/advice/heritage-at-risk/search-register/list-entry/408684
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_heritage_at_risk_id int DEFAULT null;

-- World Heritage (id)
-- e.g. http://whc.unesco.org/en/list/488/
-- full list for London: 426, 488, 795, 1084
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_world_list_id int DEFAULT null;

-- GLHER (bool, link)
-- e.g. http://www.heritagegateway.org.uk/Gateway/Results_Single.aspx?uid=2822047&resourceID=272
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_glher boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_glher_url varchar DEFAULT '';

-- Archaeological Priority Area (bool, name, tier 1-4)
-- see https://historicengland.org.uk/services-skills/our-planning-services/greater-london-archaeology-advisory-service/greater-london-archaeological-priority-areas/
-- (APA reports contain PDF maps)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_apa boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_apa_name varchar DEFAULT '';
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_apa_tier smallint DEFAULT null;

-- Locally listed
-- not usually given id or URL per-building:
-- e.g. https://lambeth.gov.uk/planning-and-building-control/building-conservation/find-out-if-an-asset-is-on-the-local-heritage
-- e.g. https://www.hackney.gov.uk/locally-listed-buildings
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_local_list boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_local_list_url varchar DEFAULT '';

-- Historic Area Assessment (bool, URL)
-- if building falls within area of report?
-- see https://historicengland.org.uk/images-books/publications/understanding-place-historic-area-assessments/
-- e.g. https://www.eustonareaplan.info/wp-content/uploads/2012/09/827_130624_Euston-Historic-Assessment_Final-Report_email.pdf
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_historic_area_assessment boolean DEFAULT false;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_historic_area_assessment_url varchar DEFAULT '';
