-- Create building indexes after bulk loading

-- Building index over UPRNs (given a building, find UPRNs)
CREATE INDEX uprn_building_idx ON building_properties ( building_id );

-- UPRN index (given a UPRN, find buildings or parents)
CREATE INDEX uprn_uprn_idx ON building_properties ( uprn );

-- Parent index over UPRNs (given a UPRN, find children)
CREATE INDEX uprn_parent_idx ON building_properties ( parent_uprn );

-- TOID index over buildings
CREATE INDEX building_toid_idx ON buildings ( ref_toid );
