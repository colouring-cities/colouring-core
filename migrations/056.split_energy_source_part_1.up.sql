ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_aggregate_estimate_epc_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_aggregate_estimate_epc_source_link text;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_dec_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_dec_source_link text;
