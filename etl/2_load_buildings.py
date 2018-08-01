"""Load buildings from CSV to Postgres


  - create 'building' record with {
        geometry_id: <polygon-guid>,
        all_uprns: [<uprn>, ...],
        uprn: <min_uprn>
    }
"""
import csv
import json
import os
import sys

import psycopg2


def main(source_file, config_path):
    """Load config, read files and save features to the database
    """
    conf = read_config(config_path)
    dbconf = conf['database']
    conn = psycopg2.connect(**dbconf)

    with conn.cursor() as cur:
        with open(source_file, 'r') as source_fh:
            reader = csv.reader(source_fh)
            for uprn, _, _, lat, lng in reader:
                geometry_id = find_geom(cur, lat, lng)
                if geometry_id is not None:
                    save_building(cur, uprn, geometry_id)
                else:
                    print("No geometry for", uprn)
        conn.commit()
    conn.close()


def find_geom(cur, lat, lng):
    """Find a building geometry
    """
    cur.execute(
        """SELECT geometry_id FROM geometries
        WHERE
        ST_Intersects(
            ST_SetSRID(ST_Point(%s, %s), 4326),
            geometry_geom
        )
        """, (
            lat,
            lng
        )
    )
    result = cur.fetchone()
    if result is not None:
        return result[0]
    else:
        return result


def save_building(cur, uprn, geometry_id):
    """Save a building
    """
    cur.execute(
        """SELECT building_id FROM buildings
        WHERE
        geometry_id = %
        """, (
            geometry_id
        )
    )
    building = cur.fetchone()
    if building is None:
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
                json.dumps({
                    'uprns': [uprn]
                }),
                geometry_id
            )
        )
    else:
        building_id = building[0]
        cur.execute(
            """UPDATE buildings
            SET
            building_doc = jsonb_insert(
                building_doc,
                '{uprns, -1}',  -- insert at end of 'uprns' array
                %s::jsonb,
                true            -- insert after location
            )
            WHERE
            building_id = %s
            """, (
                uprn,
                building_id
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
