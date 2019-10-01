SELECT log_id as revision_id, log_timestamp as revision_timestamp, building_id, forward_patch, reverse_patch, u.username as user
FROM logs l
JOIN users u ON l.user_id = u.user_id