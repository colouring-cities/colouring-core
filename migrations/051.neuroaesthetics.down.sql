ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_building_hominess;
ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_building_coherence;
ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_building_fascination;

ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_streetscape_hominess;
ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_streetscape_coherence;
ALTER TABLE building_user_attributes DROP COLUMN IF EXISTS community_streetscape_fascination;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_hominess_count;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_coherence_count;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_fascination_count;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_hominess_count;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_coherence_count;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_fascination_count;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_hominess_avg;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_coherence_avg;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_fascination_avg;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_hominess_avg;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_coherence_avg;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_fascination_avg;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_worth_keeping;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_worth_keeping_reasons;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_building_worth_keeping_based_on;

ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_worth_keeping;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_worth_keeping_reasons;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_streetscape_worth_keeping_based_on;