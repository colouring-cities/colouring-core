ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landowner text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landowner_source_link text[];
