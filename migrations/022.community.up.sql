-- Remove community fields

-- Ownership type, enumerate type from:
--

-- CREATE TYPE ownership_type
-- AS ENUM ('Private individual',
--     'Private company',
--     'Private offshore ownership',
--     'Publicly owned',
--     'Institutionally owned');

-- ALTER TABLE buildings
--     ADD COLUMN IF NOT EXISTS ownership_type ownership_type DEFAULT 'Private individual';

-- Ownership perception, would you describe this as a community asset?
-- Boolean yes / no
-- Below accepts t/f, yes/no, y/n, 0/1 as valid inputs all of which

-- ALTER TABLE buildings
--     ADD COLUMN IF NOT EXISTS ownership_perception boolean DEFAULT null;

-- Historic ownership type / perception
-- Has this building ever been used for community or public services activities?
-- Boolean yes / no

-- ALTER TABLE buildings
--     ADD COLUMN IF NOT EXISTS ownership_historic boolean DEFAULT null;

ALTER TABLE building_user_attributes
ADD COLUMN community_type_worth_keeping BOOLEAN NULL;

ALTER TABLE building_user_attributes
ADD COLUMN community_type_worth_keeping_reasons JSONB DEFAULT '{}'::JSONB;

ALTER TABLE building_user_attributes
ADD COLUMN community_local_significance BOOLEAN DEFAULT false;

ALTER TABLE buildings
ADD COLUMN community_local_significance_total INT DEFAULT 0;

ALTER TABLE buildings
ADD COLUMN community_activities BOOLEAN NULL;

CREATE TYPE public_ownership_type
    AS ENUM (
        'State-owned',
        'Charity-owned',
        'Community-owned/cooperative',
        'Owned by other non-profit body',
        'Not in public/community ownership'
    );

ALTER TABLE buildings
ADD COLUMN community_public_ownership public_ownership_type;

ALTER TABLE buildings
ADD COLUMN community_public_ownership_sources VARCHAR[];