-- Remove team fields, update in paralell with adding new fields
--Numeric small int, if > 1 triggers multifield boxes on fron end
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS number_of_awards smallint;

-- Building award, can be any of:
-- This is an edit of all potential awards to the most commonly recognised with bias to community, hertiage and design focussed ones
CREATE TYPE team_awards
AS ENUM ('Architects Journal - Heritage Project',
    'Architects Journal - Housing Project',
    'Architects Journal - Community & Faith Project',
    'Architects Journal - Small projects award',
    'Architects Journal - Public Building of the Year',
    'Architects Journal - Refurb of the Year',
    'BREEAM Award',
    'CIBSE Building Performance Awards',
    'Civic Voice Design Award',
    'Historic England best rescue of a building or place',
    'Historic England followers'' favourite',
    'ICE London Civil Engineering Awards',
    'Neave Brown Award',
    'New London Architecture awards - Conservation and retrofit',
    'New London Architecture awards - Mayors Prize',
    'New London Architecture awards - Culture & Community',
    'New London Architecture awards - Education',
    'New London Architecture awards - Homes',
    'New London Architecture awards - Housing',
    'New London Architecture awards - Offices',
    'RIBA Gold medal',
    'RIBA Stirling prize',
    'RIBA Regional award',
    'Stephen Lawrence Prize',
    'The Civic Trust Award',
    'The Pritzker Architecture Prize',
    'The Royal Academy of Engineering Major Projects Award',
    'The Manser Medal - AJ House of the Year',
    'None');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS team_awards team_awards DEFAULT 'None';

--This is a pair to team_awards each may have one
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS award_year smallint;
