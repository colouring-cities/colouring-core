"""Load geometries from GeoJSON to Postgres

  - create 'geometry' record with {
        id: <polygon-guid>,
        doc: {source_id: <toid>},
        geom: <geom-wkb_hex>
    }
"""
import glob
import json
import os
import sys

import fiona
import psycopg2
from shapely.geometry import shape


def main(source_dir, config_path):
    """Load config, read files and save features to the database
    """
    conf = read_config(config_path)
    dbconf = conf['database']
    conn = psycopg2.connect(**dbconf)

    source_files = glob.glob("{}/*.geojson".format(source_dir))

    for source_file in source_files:
        with fiona.open(source_file, 'r') as source:
            with conn.cursor() as cur:
                for feature in source:
                    save_feature(cur, feature)
                conn.commit()


def save_feature(cur, feature):
    """Save a feature with geometry and source id
    """
    cur.execute(
        """INSERT INTO geometries
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
            shape(feature['geometry']).wkb_hex,
            3857
        )
    )


def read_config(config_path):
    """Read a JSON config file containing database connection details
    """
    with open(config_path, 'r') as conf_fh:
        conf = json.load(conf_fh)
    return conf


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: {} ./path/to/source/dir ./path/to/dbconfig.json".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2])
