"""Filter MasterMap to buildings and addressbase-matches

- WHERE descriptiveGroup = '(1:Building)'
- OR toid in addressbase_toids
"""
import csv
import glob
import json
import os
import sys

from multiprocessing import Pool

csv.field_size_limit(sys.maxsize)

def main(ab_path, mm_path):
    mm_paths = sorted(glob.glob(os.path.join(mm_path, "*.gml.csv")))
    toid_paths = sorted(glob.glob(os.path.join(ab_path, "ab_toids_*.txt")))

    try:
        assert len(mm_paths) == len(toid_paths)
    except AssertionError:
        print(mm_paths)
        print(toid_paths)
    zipped_paths = zip(mm_paths, toid_paths)

    # parallel map over tiles
    with Pool(4) as p:
        p.starmap(filter, zipped_paths)

def filter(mm_path, toid_path):
    with open(toid_path, 'r') as fh:
        r = csv.reader(fh)
        toids = set(line[0] for line in r)

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

                    elif line['fid'] in toids:
                        alt_w.writerow(line)



if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: filter_mastermap.py ./path/to/addressbase/dir ./path/to/mastermap/dir")
        exit(-1)
    main(sys.argv[1], sys.argv[2])
