"""Filter MasterMap to buildings

- WHERE descriptiveGroup includes 'Building'
"""
import csv
import glob
import json
import os
import sys

from multiprocessing import Pool

csv.field_size_limit(sys.maxsize)

def main(mastermap_path):
    mm_paths = sorted(glob.glob(os.path.join(mastermap_path, "*.gml.csv")))
    for mm_path in mm_paths:
        filter(mm_path)


def filter(mm_path)
    output_path =  "{}.filtered.csv".format(str(mm_path).replace(".gml.csv", ""))
    alt_output_path =  "{}.filtered_not_building.csv".format(str(mm_path).replace(".gml.csv", ""))
    output_fieldnames = ('WKT', 'fid', 'descriptiveGroup')
    with open(mm_path, 'r') as fh:
        r = csv.DictReader(fh)
        with open(output_path, 'w') as output_fh:
            w = csv.DictWriter(output_fh, fieldnames=output_fieldnames)
            w.writeheader()
            with open(alt_output_path, 'w') as alt_output_fh:
                alt_w = csv.DictWriter(alt_output_fh, fieldnames=output_fieldnames)
                alt_w.writeheader()
                for line in r:
                    if 'Building' in line['descriptiveGroup']:
                        w.writerow(line)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: filter_mastermap.py ./path/to/mastermap/dir")
        exit(-1)
    main(sys.argv[1])
