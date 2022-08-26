def floor_level_to_int(lvl):
    """Convert differently formatted floor level strings to ints."""
    if 'Ground' in lvl or 'ground' in lvl:
        lvl = 0
    elif lvl == 'NODATA!':
        lvl = None
    elif lvl[0] == '0' and lvl != '0':
        lvl = lvl[1]
    else:
        ordinals = ['st', 'nd', 'rd', 'th']
        for ordinal in ordinals:
            lvl = lvl.replace(ordinal, '')
    try:
        lvl = int(lvl)
    except:
        pass
    return lvl