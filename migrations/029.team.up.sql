ALTER TABLE buildings ADD COLUMN IF NOT EXISTS has_extension boolean null;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_year smallint;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS developer_type varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS designers varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS designers_source_link text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS lead_designer_type varchar;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS designer_awards boolean null;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS awards_source_link text[];