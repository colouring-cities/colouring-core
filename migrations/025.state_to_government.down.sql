-- new enum value
ALTER TYPE public_ownership_type ADD VALUE IF NOT EXISTS 'State-owned' BEFORE 'Charity-owned';

-- convert existing values
UPDATE buildings
SET community_public_ownership = 'State-owned'
WHERE community_public_ownership = 'Government-owned';

CREATE TYPE public_ownership_type_new
    AS ENUM (
        'State-owned',
        'Charity-owned',
        'Community-owned/cooperative',
        'Owned by other non-profit body',
        'Not in public/community ownership'
    );

-- Convert to the new type, casting via text representation
ALTER TABLE buildings
  ALTER COLUMN community_public_ownership TYPE public_ownership_type_new
    USING (community_public_ownership::text::public_ownership_type_new);

-- And swap the types
DROP TYPE public_ownership_type;

ALTER TYPE public_ownership_type_new RENAME TO public_ownership_type;
