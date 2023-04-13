-- modifies what was setup in 017.construction-materials.up.sql

ALTER TABLE buildings
ALTER construction_secondary_materials SET DATA TYPE text ARRAY[8] USING (
    CASE WHEN construction_secondary_materials IS NULL
    THEN NULL
    ELSE ARRAY[construction_secondary_materials::text]
    END
)