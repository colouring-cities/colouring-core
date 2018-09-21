"""Check if AddressBase TOIDs will match MasterMap
"""
import csv
import glob
import os
import sys

from multiprocessing import Pool

csv.field_size_limit(sys.maxsize)

def main(ab_path, mm_path):
    ab_paths = sorted(glob.glob(os.path.join(ab_path, "*.gml.csv.filtered")))
    mm_paths = sorted(glob.glob(os.path.join(mm_path, "*.gz.csv")))

    assert len(ab_paths) == len(mm_paths)
    zipped_paths = zip(ab_paths, mm_paths)

    with Pool(4) as p:
        p.starmap(check, zipped_paths)

def check(ab_path, mm_path):
    tile = str(os.path.basename(ab_path)).split(".")[0]
    print(tile)
    ab_toids = set()
    mm_toids = set()

    with open(ab_path, 'r') as fh:
        r = csv.DictReader(fh)
        for line in r:
            ab_toids.add(line['toid'])

    with open(mm_path, 'r') as fh:
        r = csv.DictReader(fh)
        for line in r:
            mm_toids.add(line['fid'])

    print("MasterMap", len(mm_toids))
    print("Addressbase", len(ab_toids))
    missing = ab_toids - mm_toids
    print("in AB but not MM", len(missing))

    with open('missing_toids_{}.txt'.format(tile), 'w') as fh:
        for toid in missing:
            fh.write("{}\n".format(toid))

    with open('ab_toids_{}.txt'.format(tile), 'w') as fh:
        for toid in ab_toids:
            fh.write("{}\n".format(toid))


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: filter_addressbase_csv.py ./path/to/addressbase/dir ./path/to/mastermap/dir")
        exit(-1)
    main(sys.argv[1], sys.argv[2])
