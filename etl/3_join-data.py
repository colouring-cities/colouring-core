"""Join shapefile data to buildings

- read through shapes
- locate building in current database (by centroid)
- update building with data
"""
import json
import os
import sys

import fiona
import psycopg2

from shapely.geometry import shape


def main(source_file, config_path, transform_config_path):
    """Load config, read files and save features to the database
    """
    conf = read_config(config_path)
    transform_config = read_config(transform_config_path)
    data_mapping = [
        # from_fieldname, to_fieldname, mapping(old_val, source_val)->new_val
        (from_, to_, eval(transform))
        for from_, to_, transform in transform_config['mapping']
    ]
    dbconf = conf['database']
    conn = psycopg2.connect(**dbconf)

    with fiona.open(source_file, 'r') as source:
        epsg_code = transform_config['crs']

        with conn.cursor() as cur:
            for feature in source:
                geometry_id = find_geom(cur, feature, epsg_code)
                if geometry_id is not None:
                    save_data(
                        cur, feature['properties'], data_mapping, geometry_id)
                else:
                    print("Skipping", feature['properties'])
            conn.commit()
    conn.close()


def save_data(cur, props, data_conf, geometry_id):
    """Save data to a building
    """
    cur.execute(
        """SELECT building_id, building_doc FROM buildings
        WHERE
        geometry_id = %s
        """, (
            geometry_id,
        )
    )
    building = cur.fetchone()
    if building is None:
        doc = update_from_props({}, props, data_conf)
        cur.execute(
            """INSERT INTO buildings
            (
                building_doc,
                geometry_id
            )
            VALUES
            (
                %s::jsonb,
                %s
            )
            """, (
                json.dumps(doc),
                geometry_id
            )
        )
    else:
        building_id, old_doc = building
        doc = update_from_props(old_doc, props, data_conf)
        cur.execute(
            """UPDATE buildings
            SET
            building_doc = %s::jsonb
            WHERE
            building_id = %s
            """, (
                json.dumps(doc),
                building_id
            )
        )


def find_geom(cur, feature, epsg_code):
    """Find a building geometry
    """
    cur.execute(
        """SELECT geometry_id FROM geometries
        WHERE
        ST_Intersects(
            ST_Transform(
                ST_SetSRID(%s::geometry, %s),
                3857
            ),
            geometry_geom
        )
        """, (
            shape(feature['geometry']).wkb_hex,
            epsg_code
        )
    )
    result = cur.fetchone()
    if result is not None:
        return result[0]
    else:
        return result


def update_from_props(doc, props, mapping):
    """Expect mapping to be a list of transforms
    - from_fieldname (expect to find in source feature['properties'])
    - to_fieldname (expect to create or find in existing doc)
    - transform(old_val, new_val) function/lambda to do any processing
    """
    for from_, to_, transform in mapping:
        if to_ not in doc:
            doc[to_] = None
        doc[to_] = transform(doc[to_], props[from_])
    return doc


def read_config(config_path):
    """Read a JSON config file containing database connection details
    """
    with open(config_path, 'r') as fh:
        conf = json.load(fh)
    return conf


if __name__ == '__main__':
    if len(sys.argv) != 4:
        print(
            "Usage: {} ./path/to/source/file.csv ./path/to/dbconfig.json ./path/to/mapping.json".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2], sys.argv[3])
