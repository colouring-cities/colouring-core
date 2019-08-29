CREATE TABLE IF NOT EXISTS bulk_extracts (
    extract_id serial PRIMARY KEY,
    extracted_on timestamp NOT NULL,
    extract_path text NOT NULL
);