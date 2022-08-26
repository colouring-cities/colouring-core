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

def floor_level_to_int(lvl):
    """Convert differently formatted floor level strings to ints."""
    if lvl == 'Ground':
        lvl = 0
    elif lvl == 'NODATA!':
        lvl = None
    else:
        ordinals = ['st', 'nd', 'rd', 'th']
        for ordinal in ordinals:
            lvl = lvl.replace(ordinal, '')
        if lvl[0] == '0' and lvl != '0':
            lvl = lvl[1]
    try:
        lvl = int(lvl)
    except:
        pass
    return lvl

# +
# for fl in gla['FLOOR_LEVEL']:
#     print(fl)

# +
# gla.to_csv('gla-epc-subset.csv')
