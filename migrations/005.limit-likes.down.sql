-- Don't limit likes
ALTER TABLE building_user_likes DROP CONSTRAINT building_like_once;
