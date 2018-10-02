#!/usr/bin/env python
"""Read ogr2ogr-converted CSV, filter to get OSMM TOID reference, only active addresses
"""
import csv
import json
import sys


def main(input_path):
    output_path = "{}.filtered.csv".format(input_path)
    fieldnames = (
        'wkt', 'toid', 'uprn', 'parent_uprn'
    )
    with open(input_path) as input_fh:
        with open(output_path, 'w') as output_fh:
            w = csv.DictWriter(output_fh, fieldnames=fieldnames)
            w.writeheader()
            r = csv.DictReader(input_fh)
            for line in r:
                if line['logicalStatus'] != "1":
                    continue

                refs = json.loads(line['crossReference'])
                sources = json.loads(line['source'])
                toid = ""
                for ref, source in zip(refs, sources):
                    if source == "7666MT":
                        toid = ref

                w.writerow({
                    'uprn': line['uprn'],
                    'parent_uprn': line['parentUPRN'],
                    'toid': toid,
                    'wkt': line['WKT'],
                })


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: filter_addressbase_csv.py ./path/to/data.csv")
        exit(-1)
    main(sys.argv[1])
