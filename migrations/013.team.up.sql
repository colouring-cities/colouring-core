--Storing as json b, create column defined as jsonb
--This contains the award name and award year
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS team_awards jsonb;

--To validate this input, the following confirms it's an valid object but not that the items in the object are validated agains those we will acccept
ALTER TABLE buildings
    ADD CONSTRAINT data_is_valid CHECK (is_jsonb_valid ('{"type": "object"}', team_awards));
