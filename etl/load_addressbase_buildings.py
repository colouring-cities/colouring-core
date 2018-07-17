"""Load OS MasterMap from GeoJSON to Postgres

Use `fid` as source_id
"""
import csv
import json
import glob
import os
import sys

import psycopg2
import shapely.geometry


def main(source_path, config_path):
    """Load config, read files and save features to the database
    """
    conf = read_config(config_path)
    dbconf = conf['database']
    conn = psycopg2.connect(**dbconf)

    with conn.cursor() as cur:
        with open(source_path, 'r') as fh:
            r = csv.reader(fh)
            next(r)
            for line in r:
                geom_id = find_outline(conn, line)
                if geom_id is not None:
                    save_building(cur, line, geom_id)
        conn.commit()


def find_outline(conn, line):
    uprn, easting, northing, lat, lng = line
    with conn.cursor() as cur:
        cur.execute("""SELECT geometry_id
        FROM geometries
        """)
        # TODO WHERE easting, northing point intersects geometry
        outline = cur.fetchone()
    return outline

def save_building(cur, line, geometry_id):
    """Save a building from csv tuple
    """
    uprn, easting, northing, lat, lng = line
    # TODO check if geometry_id already has a UPRN associated
    # TODO if so, UPDATE with additional UPRN
    # TODO else INSERT
    cur.execute("""INSERT INTO buildings
        (
            building_doc,
            geometry_id
        )
        VALUES
        (
            %s,
            %s
        )
        """, (
            json.dumps({
                'source_id': uprn
            }),
            geometry_id
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
        print("Usage: {} ./path/to/source/file.csv ./path/to/dbconfig.json".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2])
