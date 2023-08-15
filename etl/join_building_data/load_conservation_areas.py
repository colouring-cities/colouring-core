"""Load CSV data to API

This is effectively an example script using the HTTP API, tailored to particular collected
datasets for conservation areas around London.

Preprocess to filter down to unique buildings:

    head -n 1 file.csv > file.uniq.csv
    cat file.csv | \
        cut -d "," -f 1,2 --complement | \
        sort -n | \
        uniq >> file.uniq.csv

Then with this script:
- read through CSV file, where entries have been pre-matched to building_id
- update building with data


"""
import csv
import os
import subprocess
import sys

import requests
from tqdm import tqdm


def main(base_url, api_key, source_file):
    """Read from file, update buildings"""
    with open(source_file, "r") as source_fh:
        source = csv.DictReader(source_fh)
        for feature in tqdm(source, total=line_count(source_file)):
            building_id, data = process_ca(feature)
            if building_id and building_id != "building_id":
                save_data(building_id, data, api_key, base_url)


def line_count(fname):
    """Count lines - relies on 'wc'"""
    p = subprocess.run(["wc", "-l", fname], stdout=subprocess.PIPE)
    if p.returncode != 0:
        raise IOError(p.returncode)
    return int(p.stdout.strip().split()[0])


def process_ca(props):
    building_id = props["building_id"]
    data = {
        "planning_in_conservation_area": True,
        "planning_conservation_area_name": props["conservation_area_name"],
    }
    return building_id, data


def save_data(building_id, data, api_key, base_url):
    """Save data to a building"""
    requests.post(
        "{}/buildings/{}.json?api_key={}".format(base_url, building_id, api_key),
        json=data,
    )


if __name__ == "__main__":
    try:
        url, api_key, filename = sys.argv[1], sys.argv[2], sys.argv[3]
    except IndexError:
        print(
            "Usage: {} <URL> <api_key> ./path/to/conservation_areas.csv".format(
                os.path.basename(__file__)
            )
        )
        exit()

    main(url, api_key, filename)
