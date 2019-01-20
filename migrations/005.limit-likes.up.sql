--
-- One like per-building, per-user
--

-- Drop duplicate likes
DELETE FROM building_user_likes
  WHERE building_like_id NOT IN (
    SELECT min(building_like_id)
    FROM building_user_likes
    GROUP BY (building_id, user_id)
  );

-- Reset counts
UPDATE buildings
  SET likes_total = (
    SELECT count(*)
    FROM building_user_likes
    WHERE buildings.building_id = building_user_likes.building_id
  )
  WHERE buildings.building_id in (
      SELECT DISTINCT building_id
      FROM building_user_likes
  );

-- Add constraint
ALTER TABLE building_user_likes ADD CONSTRAINT building_like_once UNIQUE (building_id, user_id);
