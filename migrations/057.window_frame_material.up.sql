ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_material_window_frame text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_material_window_frame_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS construction_material_window_frame_source_links text[];