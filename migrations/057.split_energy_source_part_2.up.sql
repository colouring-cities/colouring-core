DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'buildings'
          AND column_name = 'sust_energy_rating_source_type'
    ) THEN
        IF EXISTS (
            SELECT 1 FROM buildings 
            WHERE sust_energy_rating_source_type IS NOT NULL 
        ) THEN
            RAISE EXCEPTION 'Stopping execution: Column "sust_energy_rating_source_type" exists and contains data - migrate it to the new columns before deleting the column';
        END IF;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'buildings'
          AND column_name = 'sust_energy_rating_source_link'
    ) THEN
        IF EXISTS (
            SELECT 1 FROM buildings 
            WHERE sust_energy_rating_source_link IS NOT NULL 
        ) THEN
            RAISE EXCEPTION 'Stopping execution: Column "sust_energy_rating_source_link" exists and contains data - migrate it to the new columns before deleting the column';
        END IF;
    END IF;

    ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_type;
    ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_link;
END
$$;
