--Landuse is hierachical. Highest level is Order (Residential) then Group (Residential-Dwelling) then Class (Residential-Dwelling-Detached house)
--Interface will collected most detailed (class) but visualise highest level (order)
--Landuse is a table as #358

-- Land use is table with 3 levels of hierachy (highest to lowest). order > group > class

-- Land use class or classes, array object, client constrained. ARRAY[] is used to constrain array size. The array is limited to 250 based on Westfield Stratford as a single toid with many uses, this may want to be reduced down to reduce maximum size.
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_class text ARRAY[250];

-- Land use order, singular. Client and db constrained with foreign key
--
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_order text,
ADD CONSTRAINT fk_landuse_order
FOREIGN KEY ("level")
REFERENCES bulk_sources.nlud_classification_order_group ("level");



--===========================================
--
-- We also collect original landuse, structure & process is as current land use
-- We don't currently collect intermediate historic uses
--
--===========================================

-- Original Land use class or classes, array object, client constrained.
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS original_landuse_class text ARRAY[250];

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS original_landuse_order text;
