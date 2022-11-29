ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_status boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_year smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_planning_id VARCHAR DEFAULT '';
