ALTER TABLE buildings DROP COLUMN IF EXISTS context_front_garden;
ALTER TABLE buildings DROP COLUMN IF EXISTS context_back_garden;
ALTER TABLE buildings DROP COLUMN IF EXISTS context_flats_garden;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS context_front_garden boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS context_back_garden boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS context_flats_garden boolean;


ALTER TABLE buildings DROP COLUMN IF EXISTS planning_crowdsourced_site_completion_status;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_status boolean;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_crowdsourced_site_completion_year;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_year smallint;
