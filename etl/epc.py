# # Instructions
#
# 1. Download the GLA EPC data from GitHub in parquet format: https://github.com/iagw/colouring-cities/blob/master/gla-epc-subset.zstd.parquet
# 2. Place the file in `colouring-london/etl`
# 2. Run this script to convert it to CSV for easy loading into Postgres

import pandas as pd

gla = pd.read_parquet('gla-epc-subset.zstd.parquet')

gla = gla.replace('INVALID!', None)

'1st'.replace('st', '')

levels = ['01', '1st', '1', 'Ground', 'NODATA!', 'mid floor', 'Basement']
def floor_level_to_int(lvl):
    ordinals = ['st', 'nd', 'rd', 'th']
    for ordinal in ordinals:
        lvl.replace(ordinal, '')
    return lvl
list(map(floor_level_to_int, levels))

# +
# for fl in gla['FLOOR_LEVEL']:
#     print(fl)

# +
# gla.to_csv('gla-epc-subset.csv')
