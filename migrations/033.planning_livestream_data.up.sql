CREATE TABLE IF NOT EXISTS planning_data (
        -- internal unique id
        planning_entry_id serial PRIMARY KEY,

        -- assigned by planning authority
        planning_application_id VARCHAR(50),
        planning_application_link VARCHAR(260),
        description VARCHAR,
        registered_with_local_authority_date date,
        decision_date date,
        last_synced_date date,
        status VARCHAR(20),
        data_source VARCHAR(70),
        data_source_link VARCHAR(150),
        uprn bigint
);
