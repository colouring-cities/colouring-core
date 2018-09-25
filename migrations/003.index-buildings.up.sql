-- Create building indexes after bulk loading

-- UPRN index over buildings
CREATE INDEX building_uprn_idx ON buildings ( uprn );
