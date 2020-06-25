#!/usr/bin/env python3

"""
    See bottom of script or run
        python recache.py -h
    for usage instructions
"""

import argparse
import os
from pathlib import Path
import re
import sys

import requests


def clear_cache(cache_dir: Path, tile: str):
    try:
        (cache_dir / tile).unlink()
    except:
        print(f"Warning: cached tile {tile} did not exist", file=sys.stderr)

def recreate_tile(hostname: str, port: int, tile: str):
    tile_url = f'{hostname}:{port}/tiles/{tile}'
    req = requests.get(tile_url)
    if req.status_code != 200:
        raise Exception(f"Tile request for tile {tile} returned status {req.status_code} (data: {req.json()})")


def main(cache_dir: Path, tile_list: Path, hostname: str, port: int):
    assert cache_dir.exists(), "The supplied cache dir does not exist"
    assert tile_list.exists(), "The supplied tile list file does not exist"

    tiles = tile_list.read_text().splitlines()

    for tile in tiles:
        match = re.match(r'^(\w+)/(\d{1,2})/(\d+)/(\d+)(@\dx)?\.png$', tile)
        assert match, f"Tile line {tile} does not  match required format"

        clear_cache(cache_dir, tile)
        recreate_tile(hostname, port, tile)

        print(tile)


if __name__=='__main__':
    parser = argparse.ArgumentParser(description=
        '''
Re-cache map tiles listed in a file.

Each line of the file should be of the format:
    [tileset]/[zoom]/[z]/[x]/[y][scale?].png
E.g.
    date_year/16/32812/21775.png
    date_year/16/32810/21811@2x.png
etc

The order of lines in the file determines the order of re-caching.
Names of re-cached tiles are printed to standard output.
        ''', formatter_class=argparse.RawDescriptionHelpFormatter)

    parser.add_argument('cache_directory', type=Path, help='The root directory of the tile cache (needs to be local)')
    parser.add_argument('tile_list', type=Path, help='Path to the list of tiles that should be re-cached.')
    parser.add_argument('--hostname', type=str, default="http://127.0.0.1", help='The hostname of the tile server')
    parser.add_argument('--port', type=int, default=3000, help='The port numbre of the tile server')

    args = parser.parse_args()

    main(args.cache_directory, args.tile_list, args.hostname, args.port)