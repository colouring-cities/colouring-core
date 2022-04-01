"""Convert BNG values in OpenTOID data to latitude/longitude"""
import csv
import glob
import os
import sys
from convertbng.util import convert_lonlat
from pandas import read_csv


csv.field_size_limit(sys.maxsize)


def main(opentoid_path):
    ot_paths = sorted(glob.glob(os.path.join(opentoid_path, "*.csv")))
    for ot_path in ot_paths:
        convert_opentoid_coordinates(ot_path)


def convert_opentoid_coordinates(ot_path):
    """Overwrite the input csv, adding the longitute/latitude from eastings/northings"""
    ot_data = read_csv(ot_path)
    ot_data['longitude'], ot_data['latitude'] = convert_lonlat(ot_data['EASTING'], ot_data['NORTHING'])
    ot_data.to_csv(ot_path)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: convert_opentoid_bng_latlon.py ./path/to/opentoid/dir")
        exit(-1)
    main(sys.argv[1])
