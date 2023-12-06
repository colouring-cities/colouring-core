ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_hominess integer NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_coherence integer NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_fascination integer NULL;

ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_hominess integer NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_coherence integer NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_fascination integer NULL;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_hominess_count integer DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_coherence_count integer DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_fascination_count integer DEFAULT 0;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_hominess_count integer DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_coherence_count integer DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_fascination_count integer DEFAULT 0;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_hominess_avg float DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_coherence_avg float DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_building_fascination_avg float DEFAULT 0;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_hominess_avg float DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_coherence_avg float DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_streetscape_fascination_avg float DEFAULT 0;

ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_worth_keeping boolean NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_worth_keeping_reasons  JSONB DEFAULT '{}'::JSONB;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_building_worth_keeping_based_on text;

ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_worth_keeping boolean NULL;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_worth_keeping_reasons  JSONB DEFAULT '{}'::JSONB;
ALTER TABLE building_user_attributes ADD COLUMN IF NOT EXISTS community_streetscape_worth_keeping_based_on text;
