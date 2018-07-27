"""Join buildings and geometries

- load address points
- stream through building polygons
- if building polygon intersects address point[s]
  - create 'building' record with {geometry_id: <polygon-guid>, uprns: [<uprn>, ...],
    uprn: <min_uprn>}
  - create 'geometry' record with {id: <polygon-guid>, source_id: <toid>, geom: <geom>}
- else
  - create 'skipped-geometry' record with {source_id: <toid>, geom: <geom>}
"""
import csv
import glob
import os
import sys

import fiona
from shapely.geometry import shape, mapping, Point

from rtree import index

def main(points_file, polygons_dir, output_dir, create_index):
    points_idx = index.Rtree('points_idx.rtree')
    if create_index == "true":
        print(" * Creating index")
        with open(points_file, 'r') as fh:
            r = csv.reader(fh)
            next(r)
            for i, line in enumerate(r):
                uprn, easting, northing, lat, lon = line
                lon = float(lon)
                lat = float(lat)
                points_idx.insert(i, (lon, lat, lon, lat), obj=(uprn, lon, lat))

    output_buildings = os.path.join(output_dir, 'buildings.csv')
    output_buildings_fh = open(output_buildings ,'w')
    output_buildings_w = csv.writer(output_buildings_fh)

    output_geometries = os.path.join(output_dir, 'geoms.csv')
    output_geometries_fh = open(output_geometries ,'w')
    output_geometries_w = csv.writer(output_geometries_fh)

    output_geoms_skipped = os.path.join(output_dir, 'geoms_skipped.csv')
    output_geoms_skipped_fh = open(output_geoms_skipped ,'w')
    output_geoms_skipped_w = csv.writer(output_geoms_skipped_fh)

    poly_files = glob.glob("{}/*.geojson".format(polygons_dir))
    poly_id = -1
    for poly_file in poly_files:

        print(" * ", poly_file)
        with fiona.open(poly_file, 'r') as source:
            for poly in source:
                poly_id = poly_id + 1
                geom = shape(poly['geometry'])
                bounds_intersects = points_idx.intersection(
                    geom.bounds,
                    objects=True
                )
                uprns = []
                for item in bounds_intersects:
                    uprn, lon, lat = item.object
                    p = Point(lon, lat)
                    if p.intersects(geom):
                        uprns.append(int(uprn))
                if uprns:
                    # create geom and building
                    output_buildings_w.writerow((poly_id, str(uprns), min(uprns)))
                    output_geometries_w.writerow((poly_id, poly['properties']['fid'], geom.wkt))
                else:
                    # record skipped-geom
                    output_geoms_skipped_w.writerow((poly_id, poly['properties']['fid'], geom.wkt))


    output_buildings_fh.close()
    output_geometries_fh.close()
    output_geoms_skipped_fh.close()


if __name__ == '__main__':
    if len(sys.argv) != 5:
        print("Usage: {} ./path/to/addressbase.csv ./path/to/geoms_geojson_dir/ ./path/to/output/dir create index<true|false>".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
