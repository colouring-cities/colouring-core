-- Remove community fields

-- Ownership type, enumerate type from:
--

CREATE TYPE ownership_type
AS ENUM ('Private individual',
    'Private company',
    'Private offshore ownership',
    'Publicly owned',
    'Institutionally owned');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS ownership_type ownership_type DEFAULT 'Private individual';

-- Ownerhsip perception, would you describe this as a community asset?
-- Boolean yes / no
-- Below accepts t/f, yes/no, y/n, 0/1 as valid inputs all of which

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS ownership_perception boolean DEFAULT null;

-- Historic ownership type / perception
-- Has this building ever been used for community or public services activities?
-- Boolean yes / no

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS ownership_historic boolean DEFAULT null;
