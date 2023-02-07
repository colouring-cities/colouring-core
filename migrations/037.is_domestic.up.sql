ALTER TABLE buildings ADD COLUMN IF NOT EXISTS is_domestic text null;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_type_worth_keeping_total integer DEFAULT 0;
