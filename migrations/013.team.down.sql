-- Remove team fields, update in paralell with adding new fields

--Numeric small int, if > 1 triggers multifield boxes on fron end
ALTER TABLE buildings DROP COLUMN IF EXISTS number_of_awards;

-- Award or awards (may be multiple) stored as json b object
ALTER TABLE buildings DROP COLUMN IF EXISTS team_awards;

--This is a pair to team_awards each may have one
ALTER TABLE buildings DROP COLUMN IF EXISTS award_year;
