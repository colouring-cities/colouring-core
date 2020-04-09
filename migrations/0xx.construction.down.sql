--NOTE Some construction category fields (insulation and glazing) are migrated in sustainability.up.1-extra see #405
--Primary material (brick/clay tile, slate, steel/metal, timber, stone, glass, concrete, natural-green or thatch, asphalt or other)
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_primary_mat;

--Secondary material
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_secondary_mat;

--Primary roof material
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_primary_roof_mat;

--Secondary roof material
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_secondary_roof_mat;

--Has building been extended y/n
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_extension;

--What kind of extensions (side, rear, loft, basement)
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_extension_type;

--Glazing type, what is most common glazing type. (unless I add into sustainability for now)
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_glazing_type;

--Also pick up roof in this for
