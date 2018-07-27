"""Load OS MasterMap from GeoJSON to Postgres

Use `fid` as source_id
"""
import json
import glob
import os
import sys

import psycopg2
import shapely.geometry


def main(source_dir, config_path):
    """Load config, read files and save features to the database
    """
    conf = read_config(config_path)
    dbconf = conf['database']
    conn = psycopg2.connect(**dbconf)

    files = glob.glob(os.path.join(source_dir, '*.geojson'))
    n = len(files)

    for i, filename in enumerate(files):
        print("Processing {} ({} of {})".format(filename, i+1, n))
        with open(filename, 'r') as fh:
            data = json.load(fh)
            with conn.cursor() as cur:
                for feature in data['features']:
                    save_feature(cur, feature)
                conn.commit()


def save_feature(cur, feature):
    """Save a feature with geometry and source id
    """
    cur.execute("""INSERT INTO geometries
        (
            geometry_doc,
            geometry_geom
        )
        VALUES
        (
            %s,
            ST_SetSRID(%s::geometry, %s)
        )
        """, (
            json.dumps({
                'source_id': feature['properties']['fid']
            }),
            shapely.geometry.shape(feature['geometry']).wkb_hex,
            3857
        )
    )


def read_config(config_path):
    """Read a JSON config file containing database connection details
    """
    with open(config_path, 'r') as fh:
        conf = json.load(fh)
    return conf


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: {} ./path/to/source/dir ./path/to/dbconfig.json".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2])
