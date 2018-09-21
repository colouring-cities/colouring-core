#!/usr/bin/env python
"""Read ogr2ogr-converted CSV, filter to get OSMM TOID reference, only active addresses
"""
import csv
import json
import sys

from collections import defaultdict

def main(input_path):
    output_path = "{}.filtered".format(input_path)
    fieldnames = (
        'toid', 'uprn', 'wkt', 'uprn_relations'
    )
    by_toid = defaultdict(list)

    with open(input_path) as input_fh:
        r = csv.DictReader(input_fh)
        for line in r:
            if line['logicalStatus'] != "1":
                continue

            refs = eval(line['crossReference'])
            sources = eval(line['source'])
            toid = ""
            for ref, source in zip(refs, sources):
                if source == "7666MT":
                    toid = ref

            by_toid[toid].append({
                'uprn': line['uprn'],
                'parent': line['parentUPRN'],
                'wkt': line['WKT']
            })

    with open(output_path, 'w') as output_fh:
        w = csv.DictWriter(output_fh, fieldnames=fieldnames)
        w.writeheader()
        for toid, uprns in by_toid.items():
            if toid == "":
                print(len(uprns), "not matched")
                continue
            if len(uprns) == 1:
                # if there's only one, pick that as the 'primary' uprn for the toid
                uprn = uprns[0]['uprn']
            else:
                # else try picking a top-level match (i.e. uprn with no parent)
                orphans = set(u['uprn'] for u in uprns if not u['parent'])
                if orphans:
                    uprn = orphans.pop()
                # else climb to a root of the current tree (forest?)
                else:
                    uprn_tree = {}
                    for u in uprns:
                        uprn_tree[u['uprn']] = u['parent']

                    uprn = uprns[0]['uprn']
                    while True:
                        if uprn in uprn_tree and uprn_tree[uprn]:
                            uprn = uprn_tree[uprn]
                        else:
                            break

            # pick out wkt
            wkt = ''
            for item in uprns:
                if item['uprn'] == uprn:
                    wkt = item['wkt']

            w.writerow({
                'toid': toid,
                'wkt': wkt,
                'uprn': uprn,
                'uprn_relations': json.dumps([{
                    'uprn': u['uprn'],
                    'parent': u['parent']
                } for u in uprns])
            })


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: filter_addressbase_csv.py ./path/to/data.csv")
        exit(-1)
    main(sys.argv[1])
