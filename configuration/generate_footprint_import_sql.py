''' Generate an SQL Script to insert Colouring Cities building footprints from GEOJSON Data '''

import json

INPUT_DIRECTORY = "./"
INPUT_FILENAME = "sg_building_footprint.geojson"

OUTPUT_FILENAME = "generate_footprints.sql"

OUTPUT = []

print(f"Saving to file: '{OUTPUT_FILENAME}' ... ", end='')

OUTPUT.append("DROP TABLE IF EXISTS new_geometries;\n")
OUTPUT.append("""CREATE TABLE IF NOT EXISTS new_geometries (
    source_id varchar(30),
    geometry_geom geometry(GEOMETRY, 3857)
);\n""")

IDENTIFIER_COUNTER = 1

def file_location():
    ''' Docstring '''
    return INPUT_DIRECTORY

def file_location_name():
    ''' Docstring '''
    return INPUT_FILENAME

def location_code():
    ''' Docstring '''
    # things like "inspire+localmap_intersect5201"
    # lc - leicester
    # nc - Newcastle
    # lbx - area_around_loughborough
    #return "lbx"
    return "sgp"

# end of configuration

def fake_toid_prefix():
    ''' Docstring '''
    return 'inspire+local_ntrsc_' + location_code()

def files_loaded():
    ''' Docstring '''
    return [
        file_location() + file_location_name()
    ]

def load_into_table(table, geojson_file):
    ''' Docstring '''
    global IDENTIFIER_COUNTER

    with open(geojson_file, 'r', encoding="utf8") as content_file:
        content = content_file.read()
        data = json.loads(content)
        insert_prefix = "INSERT INTO " + table + "(source_id, geometry_geom) VALUES"

        OUTPUT.append(insert_prefix)    #no new line!

        values = []

        for entry in data["features"]:
            geometry_type = entry["geometry"]["type"]

            if geometry_type == 'MultiPolygon':
                for ring in entry["geometry"]["coordinates"]:
                    for coord_list in ring:
                        for coord in coord_list:
                            lon = coord[0]
                            lat = coord[1]
                            if lon > 180:
                                raise Exception("out of bounds coordinate")
                            if lon < -180:
                                raise Exception("out of bounds coordinate")
                            if lat > 90:
                                raise Exception("out of bounds coordinate")
                            if lat <-90:
                                raise Exception("out of bounds coordinate")
            elif geometry_type == 'Polygon':
                for coord_list in entry["geometry"]["coordinates"]:
                    for coord in coord_list:
                        lon = coord[0]
                        lat = coord[1]
                        if lon > 180:
                            raise Exception("out of bounds coordinate")
                        if lon < -180:
                            raise Exception("out of bounds coordinate")
                        if lat > 90:
                            raise Exception("out of bounds coordinate")
                        if lat <-90:
                            raise Exception("out of bounds coordinate")
            #else:
                #print(entry["geometry"]["type"])
                #print(entry["geometry"])
                #print(entry)
                #raise Exception("Unexpected type")

            object_id = fake_toid_prefix() + str(IDENTIFIER_COUNTER)

            if len(object_id) > 30:
                print(object_id)
                print(len(object_id))
                raise Exception("Too long")

            values.append("('" + object_id + "', ST_Transform(ST_GeomFromGeoJSON('" + json.dumps(entry["geometry"]) + "'), 3857))")

            IDENTIFIER_COUNTER += 1
            grouping = 50_000

            if len(values) > grouping:
                OUTPUT.append(", ".join(values[0:grouping]) + ";\n")
                values = values[grouping:]
                OUTPUT.append(insert_prefix)    #no new line

        OUTPUT.append(", ".join(values) + ";\n")

for file in files_loaded():
    load_into_table("new_geometries", file)

OUTPUT.append("""INSERT INTO geometries ( source_id, geometry_geom )
         SELECT source_id, geometry_geom
         FROM new_geometries;\n""")
OUTPUT.append("""INSERT INTO buildings ( geometry_id, ref_toid )
         SELECT geometry_id, source_id
         FROM geometries AS g
         WHERE EXISTS ( SELECT source_id
                        FROM new_geometries AS ng
                        WHERE g.source_id = ng.source_id);\n""")
OUTPUT.append("DROP TABLE IF EXISTS new_geometries;\n")
OUTPUT.append("REINDEX TABLE geometries;\n")
OUTPUT.append("REINDEX TABLE buildings;\n")

with open(OUTPUT_FILENAME, 'w', newline='', encoding="utf8") as f:
    for row in OUTPUT:
        f.write(row)

print("Done!")
