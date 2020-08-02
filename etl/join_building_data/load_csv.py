"""Join csv data to buildings

Run `python load_csv.py -h` for full usage instructions and a list of all options.

Example usage (replace URL with test/staging/localhost as necessary, API key with real key for
the appropriate site):

    python load_csv.py \
        https://colouring.london \
        a0a00000-0a00-0aaa-a0a0-0000aaaa0000 \
        data.csv

The optional last argument specifies which columns should be parsed as JSON values.
This is required for example for columns of array type to be processed by the API correctly.
Otherwise, those values would be treated as a string and not an array.

An example usage with the json_columns argument (other values in the example are placeholders):
    python load_csv.py \
        https://colouring.london \
        a0a00000-0a00-0aaa-a0a0-0000aaaa0000 \
        data.csv \
        current_landuse_group,date_url

This script uses the HTTP API, and can process CSV files which identify buildings by id, TOID,
UPRN.

The process:
    - assume first line of the CSV is a header, where column names are either
        - building identifiers - one of:
            - building_id
            - toid
            - uprn
        - building data field names
    - read through lines of CSV:
        - use building id if provided
            - else lookup by toid
            - else lookup by uprn
            - else locate building by representative point
        - (optional) parse JSON column values
        - update building

TODO extend to allow latitude,longitude or easting,northing columns and lookup by location.

"""
import argparse
import csv
import json
import os
import sys

import requests

from requests_threads import AsyncSession
from retrying import retry
from tqdm import tqdm


async def main():
    """Read from file, update buildings
    """
    # HACK to pull values from argparse global - running async using the session
    # doesn't allow arguments to the main func, as far as I can see
    base_url = args.url
    api_key = args.api_key
    source_file = args.path
    json_columns = args.json_columns
    no_overwrite = args.no_overwrite
    debug = args.debug

    with open(source_file, 'r') as source:
        reader = csv.DictReader(source)
        lines = [line for line in reader]
        for line in tqdm(lines):
            building_id = find_building(line, base_url, debug)
            line = parse_json_columns(line, json_columns)

            if building_id is None:
                continue

            if 'sust_dec' in line and line['sust_dec'] == '':
                del line['sust_dec']

            if no_overwrite:
                try:
                    check = await check_data_present(building_id, line.keys(), base_url)
                    if check:
                        print(f'Building {building_id}: Not updating to avoid overwriting existing data')
                        continue
                except ApiRequestError as e:
                    print(f'Error checking existing data for building {building_id}: status {e.code}, data: {e.data}')
                    raise

            response_code, response_data = await update_building(building_id, line, api_key, base_url)
            if response_code >= 500:
                print('ERROR', building_id, response_code, response_data, file=sys.stderr)
            elif debug and response_code >= 400:
                print('WARNING', building_id, response_code, response_data, file=sys.stderr)
            elif debug:
                print('DEBUG', building_id, response_code, response_data, file=sys.stderr)


class ApiRequestError(Exception):
    def __init__(self, code, data, message=''):
        self.code = code
        self.data = data
        super().__init__(message)


async def check_data_present(building_id, fields, base_url):
    response_code, current_state = await get_building(building_id, base_url)
    if response_code != 200:
        raise ApiRequestError(response_code, current_state)
    else:
        id_fields = set(['building_id', 'toid', 'uprn'])
        field_names_without_ids = [k for k in fields if k not in id_fields]

        return any([current_state.get(k, None) != None for k in field_names_without_ids])


@retry(wait_exponential_multiplier=1000, wait_exponential_max=10000)
async def get_building(building_id, base_url):
    """Get data for a building
    """
    r = await session.get(f"{base_url}/api/buildings/{building_id}.json")
    return r.status_code, r.json()


@retry(wait_exponential_multiplier=1000, wait_exponential_max=10000)
async def update_building(building_id, data, api_key, base_url):
    """Save data to a building
    """
    r = await session.post(
        "{}/api/buildings/{}.json".format(base_url, building_id),
        params={'api_key': api_key},
        json=data
    )
    return r.status_code, r.json()


def find_building(data, base_url, debug=False):
    if 'building_id' in data:
        building_id = data['building_id']
        if building_id is not None:
            if debug:
                print("match_by_building_id", building_id)
            return building_id

    if 'toid' in data:
        building_id = find_by_reference(base_url, 'toid', data['toid'])
        if building_id is not None:
            if debug:
                print("match_by_toid", data['toid'], building_id)
            return building_id

    if 'uprn' in data:
        building_id = find_by_reference(base_url, 'uprn', data['uprn'])
        if building_id is not None:
            if debug:
                print("match_by_uprn", data['uprn'], building_id)
            return building_id
    if debug:
         print("no_match", data)
    return None


@retry(wait_exponential_multiplier=1000, wait_exponential_max=10000)
async def find_by_reference(base_url, ref_key, ref_id):
    """Find building_id by TOID or UPRN
    """
    r = await session.get("{}/api/buildings/reference".format(base_url), params={
        'key': ref_key,
        'id': ref_id
    })
    buildings = r.json()

    if buildings and 'error' not in buildings and len(buildings) == 1:
        building_id = buildings[0]['building_id']
    else:
        building_id = None

    return building_id


def parse_json_columns(row, json_columns):
    try:
        for col in json_columns:
            row[col] = json.loads(row[col])
    except Exception as e:
        print(row)
        raise e
    return row


def list_str(values):
    return values.split(',')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('url', help='URL for the app')
    parser.add_argument('api_key', help='API key for the user')
    parser.add_argument('path', help='Path to data CSV file')
    parser.add_argument('json_columns',
        nargs='?',
        type=list_str,
        default=[],
        help='A comma-separated list of columns which should be parsed as JSON')

    parser.add_argument('--no-overwrite', '-n',
        action='store_true',
        dest='no_overwrite',
        help='Don\'t overwrite building data if any of the fields supplied is already set')

    parser.add_argument('--debug', '-d',
        action='store_true',
        help='Print debug messages')

    args = parser.parse_args()

    # performance - running async gives ~5-10x speedup over serial requests
    session = AsyncSession(n=1)
    session.run(main)
