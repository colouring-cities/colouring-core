COPY(SELECT
    log_id as revision_id,
    date_trunc('second', log_timestamp) as revision_timestamp,
    building_id,
    forward_patch,
    reverse_patch,
    u.username as user
FROM logs l
JOIN users u
    ON l.user_id = u.user_id)
TO '/tmp/edit_history.csv'
WITH CSV HEADER
