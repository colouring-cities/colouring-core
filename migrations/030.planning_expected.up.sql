ALTER TABLE building_user_attributes
ADD COLUMN community_expected_planning_application BOOLEAN NULL;

ALTER TABLE buildings
ADD COLUMN community_expected_planning_application_total INT DEFAULT 0;
