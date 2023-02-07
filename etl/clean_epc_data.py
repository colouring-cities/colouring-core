# # Instructions
#
# 1. Download the GLA EPC data from GitHub in parquet format:
#     github.com/iagw/colouring-cities/blob/master/gla-epc-subset.zstd.parquet
# 2. Place the file in `colouring-london/etl`
# 3. Run this script to convert it to CSV for easy loading into Postgres

import pandas as pd
from epc_cleaning_functions import floor_level_to_int, construction_to_int

gla = pd.read_parquet('gla-epc-subset.zstd.parquet')

# Remove invalid CURRENT_ENERGY_RATING
gla = gla.replace('INVALID!', None)

# Clean the FLOOR_LEVEL column
gla['FLOOR_LEVEL'] = gla['FLOOR_LEVEL'].apply(floor_level_to_int)

# Clean the CONSTRUCTION_AGE_BAND column
gla['CONSTRUCTION_AGE_BAND'] = gla['CONSTRUCTION_AGE_BAND'].apply(construction_to_int)  # noqa: E501

# Remove NaNs and non finite values
with pd.option_context('mode.use_inf_as_null', True):
    gla.dropna(inplace=True)

# Ensure int not float
gla['CONSTRUCTION_AGE_BAND'] = gla['CONSTRUCTION_AGE_BAND'].astype(int)

# Ensure int not float
gla['FLOOR_LEVEL'] = gla['FLOOR_LEVEL'].astype(int)

# Ensure int not float
gla['UPRN'] = gla['UPRN'].astype(int)

# Export to csv
gla.to_csv('gla-epc-subset.csv')
