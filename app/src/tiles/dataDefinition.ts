import { strictParseInt } from "../parse";
import { DataConfig } from "./renderers/datasourceRenderer";

const BUILDING_LAYER_DEFINITIONS = {
    base_light: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    base_night: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    date_year: `(
        SELECT
            b.date_year as date_year,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    size_storeys: `(
        SELECT
            (
                coalesce(b.size_storeys_attic, 0) +
                coalesce(b.size_storeys_core, 0)
            ) as size_storeys,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    location: `(
        SELECT
            (
                case when b.location_name is null then 0 else 1 end +
                case when b.location_number is null then 0 else 1 end +
                case when b.location_street is null then 0 else 1 end +
                case when b.location_line_two is null then 0 else 1 end +
                case when b.location_town is null then 0 else 1 end +
                case when b.location_postcode is null then 0 else 1 end +
                case when b.location_latitude is null then 0 else 1 end +
                case when b.location_longitude is null then 0 else 1 end +
                case when b.ref_toid is null then 0 else 1 end +
                case when b.ref_osm_id is null then 0 else 1 end
            ) as location_info_count,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as location`,
    likes: `(
        SELECT
            g.geometry_geom,
            b.likes_total as likes
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.likes_total > 0
    ) as location`,
    conservation_area: `(
        SELECT
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.planning_in_conservation_area = true
    ) as conservation_area`
};

const GEOMETRY_FIELD = 'geometry_geom';

function getBuildingsDataConfig(tileset: string, dataParams: any): DataConfig {
    const table = BUILDING_LAYER_DEFINITIONS[tileset];

    if(table == undefined) {
        throw new Error('Invalid tileset requested');
    }

    return {
        geometry_field: GEOMETRY_FIELD,
        table: table
    };
}

function getHighlightDataConfig(tileset: string, dataParams: any): DataConfig {
    let { highlight, base } = dataParams;

    highlight = strictParseInt(highlight);

    if(isNaN(highlight) || base == undefined || base.match(/^\w+$/) == undefined) {
        throw new Error('Bad parameters for highlight layer');
    }

    return {
        geometry_field: GEOMETRY_FIELD,
        table: `(
            SELECT
                g.geometry_geom,
                '${base}' as base_layer
            FROM
                geometries as g
            WHERE
                g.geometry_id = ${highlight}
        ) as highlight`
    };
}

export {
    getBuildingsDataConfig,
    getHighlightDataConfig
};
