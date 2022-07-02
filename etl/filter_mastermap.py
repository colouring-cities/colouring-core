"""Filter MasterMap to buildings

- WHERE descriptiveGroup includes 'Building'
"""
import csv
import glob
import os
import sys


csv.field_size_limit(sys.maxsize)


def main(mastermap_path):
    mm_paths = sorted(glob.glob(os.path.join(mastermap_path, "*.gml.csv")))
    for mm_path in mm_paths:
        filter_mastermap(mm_path)


def filter_mastermap(mm_path):
    output_path = str(mm_path).replace(".gml.csv", "")
    output_path = "{}.filtered.csv".format(output_path)
    output_fieldnames = ('WKT', 'fid', 'descriptiveGroup')
    # Open the input csv with all polygons, buildings and others
    with open(mm_path, 'r') as fh:
        r = csv.DictReader(fh)
        # Open a new output csv that will contain just buildings
        with open(output_path, 'w') as output_fh:
            w = csv.DictWriter(output_fh, fieldnames=output_fieldnames)
            w.writeheader()
            for line in r:
                try:
                    if 'Building' in line['descriptiveGroup']:
                        w.writerow(line)
                # when descriptiveGroup is missing, ignore this Polygon
                except TypeError:
                    pass


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: filter_mastermap.py ./path/to/mastermap/dir")
        exit(-1)
    main(sys.argv[1])
