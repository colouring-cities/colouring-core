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
    mm_paths = sorted(glob.glob(os.path.join(mm_path, "*.gml.csv")))

    try:
        assert len(ab_paths) == len(mm_paths)
    except AssertionError:
        print(ab_paths)
        print(mm_paths)

    zipped_paths = zip(ab_paths, mm_paths)

    # parallel map over tiles
    with Pool() as p:
        p.starmap(check, zipped_paths)

def check(ab_path, mm_path):
    tile = str(os.path.basename(ab_path)).split(".")[0]
    output_base = os.path.dirname(ab_path)
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

    missing = ab_toids - mm_toids
    print(tile, "MasterMap:", len(mm_toids), "Addressbase:", len(ab_toids), "AB but not MM:", len(missing))

    with open(os.path.join(output_base, 'missing_toids_{}.txt'.format(tile)), 'w') as fh:
        for toid in missing:
            fh.write("{}\n".format(toid))

    with open(os.path.join(output_base, 'ab_toids_{}.txt'.format(tile)), 'w') as fh:
        for toid in ab_toids:
            fh.write("{}\n".format(toid))


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: check_ab_mm_match.py ./path/to/addressbase/dir ./path/to/mastermap/dir")
        exit(-1)
    main(sys.argv[1], sys.argv[2])
