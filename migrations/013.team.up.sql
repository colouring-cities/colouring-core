-- Remove team fields, update in paralell with adding new fields



--Numeric small int, if > 1 triggers multifield boxes on fron end
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS number_of_awards smallint;


-- Building award, any of:
-- 

CREATE TYPE team_awards
AS ENUM ('RIBA Gold mdeal',
    'RIBA Sitrling prize',
    'RIBA Regional award',
    'The Civic Trust Award',
    'CIBSE Building Performance Awards',
    'The Pritzker Architecture Prize',
    'The Royal Academy of Engineering Major Projects Award',
    'BREEAM Award',
    'Civic Voice Design Award',
    'Stephen Lawrence Prize',
    'Neave Brown Award',
    'ICE London Civil Engineering Awards',
    'Historic England best rescue of a building or place',
    "Historic England followers' favourite",
    'New London Architecture awards - Conservation and retrofit',
    'New London Architecture awards - Mayors Prize',
    'New London Architecture awards - Culture & Community',
    'New London Architecture awards - Education',
    'New London Architecture awards - Homes',
    'New London Architecture awards - Housing',
    'New London Architecture awards - Offices',
    'The Manser Medal - AJ House of the Year',
    'Architects Jorunal - Heritage Project',
    'Architects Jorunal - Housing Project',
    'Architects Jorunal - Community & Faith Project',
    'Architects Jorunal - Small projects award',
    'Architects Jorunal - Public Building of the Year',
    'Architects Jorunal - Refurb of the Year',
    'None');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS team_awards team_awards DEFAULT 'None';

--This is a pair to team_awards each may have one
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS award_year smallint;
