-- Launch of Construction category
-- Fields: Core construction material, Secondary construction materials, Roof covering materials

-- Construction materials: Wood, Stone, Brick, Steel, Reinforced Concrete, Other Metal
--   Other Natural Material, Other Man-Made Material
CREATE TYPE construction_materials
    AS ENUM (
        'Wood',
        'Stone',
        'Brick',
        'Steel',
        'Reinforced Concrete',
        'Other Metal',
        'Other Natural Material',
        'Other Man-Made Material'
    );

-- Roof covering materials: Slate, Clay Tile, Wood, Asphalt, Iron or Steel, Other Metal
--   Other Natural Material, Other Man-Made Material
CREATE TYPE roof_covering
    AS ENUM (
        'Slate',
        'Clay Tile',
        'Wood',
        'Asphalt',
        'Iron or Steel',
        'Other Metal',
        'Other Natural Material',
        'Other Man-Made Material'
    );

-- Core Construction Material
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS construction_core_material construction_materials;

-- Secondary Construction Materials
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS construction_secondary_materials construction_materials;

-- Main Roof Covering
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS construction_roof_covering roof_covering;
