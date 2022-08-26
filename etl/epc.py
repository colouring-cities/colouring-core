# # Instructions
#
# 1. Download the GLA EPC data from GitHub in parquet format: https://github.com/iagw/colouring-cities/blob/master/gla-epc-subset.zstd.parquet
# 2. Place the file in `colouring-london/etl`
# 2. Run this script to convert it to CSV for easy loading into Postgres

import pandas as pd

gla = pd.read_parquet('gla-epc-subset.zstd.parquet')

gla = gla.replace('INVALID!', None)

'01'[1]

levels = ['01', '02' '1st', '2nd', '3rd', '4th', '1', '2', '0', 'Ground', 'NODATA!', 'mid floor', 'Basement']
def floor_level_to_int(lvl):
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
list(map(floor_level_to_int, levels))

# +
# for fl in gla['FLOOR_LEVEL']:
#     print(fl)

# +
# gla.to_csv('gla-epc-subset.csv')
