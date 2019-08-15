-- Remove team fields, update in paralell with adding new fields

-- Award or awards (may be multiple) any of stored as json b object
ALTER TABLE buildings DROP COLUMN IF EXISTS team_awards;

-- Building award, any of:
-- TBC might be table 

CREATE TYPE team_awards
AS ENUM ('RIBA Gold mdeal',
    'RIBA Sitrling prize',
    'RIBA Regional award',
    'The Civic Trust Award',
    'Pass',
    'None');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS team_awards team_awards DEFAULT 'None';
