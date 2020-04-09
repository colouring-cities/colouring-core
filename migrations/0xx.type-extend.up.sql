-- Land use order, singular. Client and db constrained with foreign key
ALTER TABLE buildings
  ADD COLUMN IF NOT EXISTS original_landuse_order text,
  ADD FOREIGN KEY (current_landuse_order)
  REFERENCES reference_tables.buildings_landuse_order (description);

-- Land use groups, array. Derived from classes.
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS original_landuse_group text ARRAY[41];

 -- Land use class or classes, array object, client constrained. ARRAY[] is used to constrain array size. The array is limited to 250 based on Westfield Stratford as a single toid with many uses, this may want to be reduced down to reduce maximum size.

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS original_landuse_class text ARRAY[250];

--Landuse source 
