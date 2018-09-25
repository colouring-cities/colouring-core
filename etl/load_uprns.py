#!/usr/bin/env python
"""Load buildings from CSV to Postgres

- update 'building' record with {
    all_uprns: [<uprn>, ...],
    uprn: <min_uprn>
}
"""
import csv
import glob
import json
import os
import sys

from multiprocessing import Pool

import psycopg2


def main(addressbase_dir):
    """Read files and save features to the database
    """
    ab_paths = list(glob.glob(os.path.join(addressbase_dir, "*.gml.csv.filtered")))

    # parallel map over tiles
    with Pool() as p:
        p.map(load_file, ab_paths)


def load_file(source_file):
    """Load UPRN data from CSVs
    """
    config = {
        'host': os.environ['PGHOST'],
        'port': os.environ['PGPORT'],
        'dbname': os.environ['PGDATABASE'],
        'user': os.environ['PGUSER'],
        'password': os.environ['PGPASSWORD'],
    }
    conn = psycopg2.connect(**config)
    with conn.cursor() as cur:
        with open(source_file, 'r') as source_fh:
            reader = csv.reader(source_fh)
            next(reader)
            for toid, uprn, wkt, uprn_relations in reader:
                save_building(cur, int(uprn), toid, json.loads(uprn_relations))
        conn.commit()
    conn.close()


def save_building(cur, uprn, toid, uprn_relations):
    """Save a building
    """
    cur.execute(
        """UPDATE buildings
        SET uprn = %s, building_doc = %s::jsonb
        WHERE geometry_id = (
            SELECT geometry_id FROM geometries
            WHERE
            source_id = %s
        )
        """, (
            uprn,
            json.dumps({
                'uprn_relations': uprn_relations
            }),
            toid
        )
    )


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: {} ./path/to/addressbase_dir/".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1])
