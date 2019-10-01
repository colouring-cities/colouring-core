--Original building use, this is same NLUD fields as current building use
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS original_building_use;

-- Building attachment, ENUM: Detached, Semi-detached, End-Terrace, Mid-Terrace
CREATE TYPE building_attachment_form
AS ENUM ('Detached',
    'Semi-Detached',
    'End-Terrace',
    'Mid-Terrace',
    'Unknown');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS building_attachment_form building_attachment_form DEFAULT 'Unknown';

-- [Disabled for launch] Date of change of use
-- This needs to pair with demolition
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS date_change_building_use smallint;
