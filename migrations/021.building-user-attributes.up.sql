CREATE TABLE public.building_user_attributes (
    building_id INTEGER REFERENCES buildings,
    user_id UUID REFERENCES users,
    PRIMARY KEY (building_id, user_id),

    community_like BOOLEAN NOT NULL DEFAULT(FALSE)
);

CREATE INDEX IF NOT EXISTS user_attrib_building_id_idx ON building_user_attributes (building_id);
CREATE INDEX IF NOT EXISTS user_attrib_building_id_user_id_idx ON building_user_attributes (building_id, user_id);


INSERT INTO building_user_attributes (building_id, user_id, community_like)
select building_id, user_id, TRUE as community_like
from building_user_likes;