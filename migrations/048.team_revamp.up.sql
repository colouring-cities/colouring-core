ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_developer_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_developer_name text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_developer_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_developer_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_developer_source_link text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_designers text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_lead_designer_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_designers_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_designers_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_designers_source_link text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_builder text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_builder_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_builder_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS extension_builder_source_link text[];