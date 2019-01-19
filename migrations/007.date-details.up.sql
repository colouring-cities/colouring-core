--
-- Source details and links
--

-- Create date source details
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_source_detail varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_date_source_detail_len CHECK (length(date_source_detail) < 500);

-- Create list of links
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_link text[];
