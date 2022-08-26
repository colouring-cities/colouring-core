def floor_level_to_int(lvl):
    """Convert differently formatted floor level strings to ints.
       As you can see below, there are some assumptions made such as
       the 'top floor' being 2. This has been done so we can get an int value
       for the floor for each building automatically populated by EPC data.
       Incorrect assumptions can be updated later via the Colouring London interface.
    """
    lvl = lvl.replace('or above', '')
    lvl = lvl.replace('+', '')
    if 'Ground' in lvl or 'ground' in lvl:
        lvl = 0
    elif 'basement' in lvl or 'Basement' in lvl:
        lvl = -1
    elif lvl == 'mid floor':
        lvl = 1
    elif lvl == 'top floor':
        lvl = 2
    elif lvl == 'NODATA!':
        lvl = None
    elif lvl[0] == '0' and lvl != '0':
        lvl = lvl[1]
    else:
        ordinals = ['st', 'nd', 'rd', 'th']
        for ordinal in ordinals:
            lvl = lvl.replace(ordinal, '')
    if lvl == None:
        return None
    return int(lvl)