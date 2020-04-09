COPY(SELECT
    building_id,
    uprn,
    parent_uprn
FROM building_properties
    WHERE building_id IS NOT NULL)
TO '/tmp/building_uprns.csv'
WITH CSV HEADER
