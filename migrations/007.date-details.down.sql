-- Remove source details and links

ALTER TABLE buildings DROP COLUMN IF EXISTS date_source_detail;
ALTER TABLE buildings DROP COLUMN IF EXISTS date_link;
