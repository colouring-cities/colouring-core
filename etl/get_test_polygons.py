"""Download and load a small open dataset for testing

Run this to create a CSV of buildings geometries.

Then run:
- load_geometries.sh (loading geometries to the database)
- create_buildings.sh (creating empty building records for each geometry)
"""
# -*- coding: utf-8 -*-
import os
import subprocess

import osmnx

# configure logging/caching
osmnx.config(log_console=True, use_cache=True)

# configure the image display
size = 256

# load buildings from about 1.5km² around UCL
point = (51.524498, -0.133874)
dist = 612
gdf = osmnx.footprints_from_point(point=point, dist=dist)

# preview image
gdf_proj = osmnx.projection.project_gdf(gdf, to_crs={'init': 'epsg:3857'})
gdf_proj = gdf_proj[gdf_proj.geometry.apply(lambda g: g.geom_type != 'MultiPolygon')]  # noqa

fig, ax = osmnx.plot_footprints(gdf_proj, bgcolor='#333333',
                                color='w', figsize=(4, 4),
                                save=True, show=False, close=True,
                                filename='test_buildings_preview', dpi=600)

# save
test_dir = os.path.dirname(__file__)
test_data_geojson = str(os.path.join(test_dir, 'test_buildings.geojson'))
subprocess.run(["rm", test_data_geojson])

gdf_to_save = gdf_proj.reset_index(
)[
    ['index', 'geometry']
]

gdf_to_save.rename(
    columns={'index': 'fid'}
).to_file(
    test_data_geojson, driver='GeoJSON'
)

# convert to CSV
test_data_csv = str(os.path.join(test_dir, 'test_buildings.3857.csv'))
subprocess.run(["rm", test_data_csv])
subprocess.run(
                ["ogr2ogr", "-f", "CSV", test_data_csv,
                 test_data_geojson, "-lco", "GEOMETRY=AS_WKT"]
)

# add SRID for ease of loading to PostgreSQL
subprocess.run(
                ["sed", "-i", "s/^\"POLYGON/\"SRID=3857;POLYGON/",
                 test_data_csv]
)
