-- One like per-building, per-user
ALTER TABLE building_user_likes ADD CONSTRAINT building_like_once UNIQUE (building_id, user_id);
