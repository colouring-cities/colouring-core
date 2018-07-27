"""Extract address points from CSV in *.zip

Relevant CSV columns::
0 - UPRN
1 - TOID (may not match given version of OS MasterMap)
16 - OSGB Easting
17 - OSGB Northing
18 - Latitude
19 - Longitude
"""
import csv
import glob
import io
import os
import sys
from zipfile import ZipFile

def main(source_dir, output_file):
    with open(output_file, 'w', encoding='utf8', newline='') as fh:
        w = csv.writer(fh)
        w.writerow(('UPRN', 'easting', 'northing', 'lat', 'lng'))
        for address in read_addresses(source_dir):
            w.writerow(address)


def read_addresses(source_dir):
    zips = glob.glob(os.path.join(source_dir, '*.zip'))
    n = len(zips)
    for i, zipname in enumerate(zips):
        with ZipFile(zipname) as zipfile:
            names = zipfile.namelist()
            csvname = names[0]
            print("Processing {} ({} of {})".format(csvname, i+1, n))

            with zipfile.open(csvname) as csvfile:
                fh = io.TextIOWrapper(csvfile)
                r = csv.reader(fh)
                for line in r:
                    uprn = line[0]
                    # toid = line[1]  # skip - we do our own matching to geometries
                    easting = line[16]
                    northing = line[17]
                    lat = line[18]
                    lng = float(line[19])
                    yield uprn, easting, northing, lat, lng


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: {} ./path/to/source/dir ./path/to/output/file".format(
            os.path.basename(__file__)
        ))
        exit()
    main(sys.argv[1], sys.argv[2])
