ALTER TABLE buildings ADD COLUMN IF NOT EXISTS is_domestic text null;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_type_worth_keeping_total integer DEFAULT 0;

-- Provide counts for already liked typologies
UPDATE buildings
  SET community_type_worth_keeping_total = (
    SELECT count(*)
    FROM building_user_attributes
    WHERE buildings.building_id = building_user_attributes.building_id
    AND community_type_worth_keeping = TRUE
  )
  WHERE buildings.building_id in (
      SELECT DISTINCT building_id
      FROM building_user_attributes
  );
