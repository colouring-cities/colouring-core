import requests
import json
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, text
from sqlalchemy.sql import text
from pyproj import Transformer
from geoalchemy2 import Geometry

# Function to convert ArcGIS JSON to GeoJSON format
def arcgis_to_geojson(arcgis):
    return {
        "type": "Polygon",
        "coordinates": arcgis['rings']
    }

def create_table(option):

    if option == True:
        engine = create_engine('postgresql://colouring:colouringud@localhost:5432/colouringdb')
        
        metadata = MetaData()

        demo_cons_ideca = Table(
            'demo_cons_ideca', metadata,
            Column('objectid', Integer, primary_key=True),
            Column('concodigo', String(255)),
            Column('connpisos', Integer),
            Column('contsemis', Integer),
            Column('connsotano', Integer),
            Column('lotecodigo', String(255)),
            Column('conmejora', Integer),
            Column('conarea', Float),
            Column('shape_area', Float),
            Column('shape_len', Float),
            Column('geom', Geometry('POLYGON', srid=3857))
        )

        metadata.create_all(engine)

# Create PostgreSQL connection
engine = create_engine('postgresql://colouring:colouringud@localhost:5432/colouringdb')
metadata = MetaData()


with engine.connect() as connection:
		try:
			create_table(True)	
			# Set up the transformer
			transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)

			# Transform the coordinates of the bounding box to the EPSG:3857 projection that the IDECA API uses
			xmin, ymin = transformer.transform(-74.076605, 4.634045)
			xmax, ymax = transformer.transform(-74.068065, 4.623309)

			# Set up the query parameters
			params = {
				"where": "1=1",
				"outFields": "*",
				"f": "json",
				"geometry": f"{xmin},{ymin},{xmax},{ymax}",
				"geometryType": "esriGeometryEnvelope",            
			}

			# Set up the query URL
			url = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/mapa_base_3857/MapServer/7/query"

			# Send the GET request
			response = requests.get(url, params=params)
			print(f"Response status code: {response.status_code}")
			print(f"Response data: {response.text}")

			# Parse the response to JSON
			data = json.loads(response.text)

			for feature in data['features']:
				print('Processing feature:', feature['attributes']['OBJECTID'])  # Debug line

				# Convert the ArcGIS JSON geometry to a GeoJSON compatible format
				geom = arcgis_to_geojson(feature['geometry'])

				contsemis = feature['attributes']['CONTSEMIS']
				if contsemis is None:
					contsemis = 'None'

				stmt = text("""INSERT INTO demo_cons_ideca (objectid, concodigo, connpisos, contsemis, connsotano, lotecodigo, conmejora,conarea, shape_area, shape_len, geom) 
				values (:objectid, :concodigo, :connpisos, :contsemis, :connsotano, :lotecodigo, :conmejora, :conarea, :shape_area, :shape_len, ST_SetSRID(ST_GeomFromGeoJSON(:geom), 3857))""")
				
				parameters = {
				
				'objectid': feature['attributes']['OBJECTID'],
				'concodigo': feature['attributes']['CONCODIGO'],
				'connpisos': feature['attributes']['CONNPISOS'],
				'contsemis': contsemis,
				'connsotano': feature['attributes']['CONNSOTANO'],
				'lotecodigo': feature['attributes']['LOTECODIGO'],
				'conmejora': feature['attributes']['CONMEJORA'],
				'conarea': feature['attributes']['CONAREA'],
				'shape_area': feature['attributes']['SHAPE.AREA'],
				'shape_len': feature['attributes']['SHAPE.LEN'],
				'geom': json.dumps(geom)
				}

				# Execute the SQL statement
				connection.execute(stmt, parameters)
				connection.commit()  # commit the transaction            
					
		except Exception as e:
			print("An error occurred:", str(e)) 

