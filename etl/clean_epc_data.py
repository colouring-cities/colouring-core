# # Instructions
#
# 1. Download the GLA EPC data from GitHub in parquet format: https://github.com/iagw/colouring-cities/blob/master/gla-epc-subset.zstd.parquet
# 2. Place the file in `colouring-london/etl`
# 2. Run this script to convert it to CSV for easy loading into Postgres

import pandas as pd

gla = pd.read_parquet('gla-epc-subset.zstd.parquet')

# Remove invalid CURRENT_ENERGY_RATING

gla = gla.replace('INVALID!', None)


# Clean the FLOOR_LEVEL column

# +
# for fl in gla['FLOOR_LEVEL']:
#     print(fl)

# +
# gla.to_csv('gla-epc-subset.csv')
