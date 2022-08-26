# # Instructions
#
# 1. Download the GLA EPC data from GitHub in parquet format: https://github.com/iagw/colouring-cities/blob/master/gla-epc-subset.zstd.parquet
# 2. Place the file in `colouring-london/etl`
# 2. Run this script to convert it to CSV for easy loading into Postgres

import pandas as pd
from epc_cleaning_functions import floor_level_to_int, construction_to_int

gla = pd.read_parquet('gla-epc-subset.zstd.parquet')

# Remove invalid CURRENT_ENERGY_RATING
gla = gla.replace('INVALID!', None)

# Clean the FLOOR_LEVEL column
gla['FLOOR_LEVEL'] = gla['FLOOR_LEVEL'].apply(floor_level_to_int)

# Clean the CONSTRUCTION_AGE_BAND column
gla['CONSTRUCTION_AGE_BAND'] = gla['CONSTRUCTION_AGE_BAND'].apply(construction_to_int)

# Export to csv
gla.to_csv('gla-epc-subset.csv')
