"""Join shapefile data to buildings

This is effectively an example script using the HTTP API, tailored to particular collected
datasets for Camden (age data) and Fitzrovia (number of storeys).

- read through shapes
- locate building by toid
- else locate building by representative point
- update building with data
"""
import json
import os
import sys
from functools import partial

import fiona
import pyproj
import requests
from shapely.geometry import shape
from shapely.ops import transform


osgb_to_ll = partial(
    pyproj.transform,
    pyproj.Proj(init='epsg:27700'),
    pyproj.Proj(init='epsg:4326')
)


def main(base_url, api_key, process, source_file):
    """Read from file, update buildings
    """
    with fiona.open(source_file, 'r') as source:
        for feature in source:
            props = feature['properties']

            if process == "camden":
                toid, data = process_camden(props)
            else:
                toid, data = process_fitzrovia(props)

            if data is None:
                continue

            building_id = find_building(toid, feature['geometry'], base_url)
            if not building_id:
                print("no_match", toid, "-")
                continue

            save_data(building_id, data, api_key, base_url)


def process_camden(props):
    toid = osgb_toid(props['TOID'])
    data = {
        'date_year': props['Year_C'],
        'date_source_detail': props['Date_sou_1']
    }
    return toid, data


def process_fitzrovia(props):
    toid = osgb_toid(props['TOID'])
    storeys = props['Storeys']

    if storeys is None:
        return toid, None

    if props['Basement'] == 'Yes':
        data = {
            'size_storeys_core': int(storeys) - 1,
            'size_storeys_basement': 1
        }
    else:
        data = {
            'size_storeys_core': int(storeys),
            'size_storeys_basement': 0
        }
    return toid, data


def osgb_toid(toid):
    if toid is None:
        toid = ""
    return "osgb" + toid.lstrip("0")


def save_data(building_id, data, api_key, base_url):
    """Save data to a building
    """
    r = requests.post(
        "{}/buildings/{}.json?api_key={}".format(base_url, building_id, api_key),
        json=data
    )


def find_building(toid, geom, base_url):
    """Find building_id by TOID or location
    """
    r = requests.get(base_url + "/buildings/reference", params={
        'key': 'toid',
        'id': toid
    })
    buildings = r.json()
    if buildings and len(buildings) == 1:
        bid = buildings[0]['building_id']
        print("match_by_toid", toid, bid)
        return bid

    # try location
    poly = shape(geom)
    point_osgb = poly.centroid
    if not poly.contains(point_osgb):
        point_osgb = poly.representative_point()

    point_ll = transform(osgb_to_ll, point_osgb)
    r = requests.get(base_url + "/buildings/locate", params={
        'lng': point_ll.x,
        'lat': point_ll.y
    })
    buildings = r.json()
    if buildings and len(buildings) == 1:
        bid = buildings[0]['building_id']
        print("match_by_location", toid, bid)
        return bid

    return None


if __name__ == '__main__':
    try:
        url, api_key, process, filename = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
    except IndexError:
        print(
            "Usage: {} <URL> <api_key> <camden|fitzrovia> ./path/to/camden.shp".format(
            os.path.basename(__file__)
        ))
        exit()

    main(url, api_key, process, filename)
