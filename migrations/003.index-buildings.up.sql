-- Create building indexes after bulk loading

-- UPRN index over buildings
CREATE INDEX building_uprn_idx ON buildings ( ref_uprn );

-- TOID index over buildings
CREATE INDEX building_toid_idx ON buildings ( ref_toid );
