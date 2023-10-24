ALTER TABLE buildings DROP COLUMN IF EXISTS extension_developer_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_developer_name;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_developer_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_developer_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_developer_source_link;

ALTER TABLE buildings DROP COLUMN IF EXISTS extension_designers;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_lead_designer_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_designers_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_designers_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_designers_source_link;

ALTER TABLE buildings DROP COLUMN IF EXISTS extension_builder;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_builder_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_builder_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_builder_source_link;
