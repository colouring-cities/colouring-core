def floor_level_to_int(lvl):
    """Convert differently formatted floor level strings to ints.
       As you can see below, there are some assumptions made such as
       the 'top floor' being 2. This has been done so we can get an int value
       for the floor for each building automatically populated by EPC data.
       Incorrect assumptions can be updated later via the Colouring London interface.
    """
    if lvl == None:
        return None
    elif type(lvl) == int:
        return lvl
    # else assume we have a string
    ordinals = ['st', 'nd', 'rd', 'th']
    lvl = lvl.replace('or above', '')
    lvl = lvl.replace('+', '')
    try:
        return int(lvl)
    except ValueError:
        if 'Ground' in lvl or 'ground' in lvl:
            lvl = 0
        elif 'basement' in lvl or 'Basement' in lvl:
            lvl = -1
        elif lvl == 'mid floor':
            lvl = 1
        elif lvl == 'top floor':
            lvl = 2
        elif lvl[0] == '0' and lvl != '0':
            lvl = lvl[1]
        elif any(ordinal in lvl for ordinal in ordinals):
            for ordinal in ordinals:
                lvl = lvl.replace(ordinal, '')
        else:
            return None
        return int(lvl)
        
        
def construction_to_int(year):
    if year == None:
        return None
    elif type(year) == int:
        return year
    # else assume we have a string
    if 'before' in year:
        return int(year.split('before ')[-1])
    elif '-' in year:
        return round(sum(list(map(float, year.split(' ')[-1].split('-'))))/2)
    elif 'onwards' in year:
        return int(year.split(' onwards')[-2].split(' ')[-1])
    elif year == 'NO DATA!' or year == 'INVALID!':
        return None
    return int(year)