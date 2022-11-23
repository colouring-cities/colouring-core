def planning_data_entry_to_address(element):
    site_name = element["_source"].get("site_name")
    site_number = element["_source"].get("site_number")
    street_name = element["_source"].get("street_name") # seems often misused - say "31 COPTHALL ROAD EAST" site_name getting Ickenham street_name
    secondary_street_name = element["_source"].get("secondary_street_name")
    return generate_address(site_name, site_number, street_name, secondary_street_name)['result']

def generate_address(site_name, site_number, street_name, secondary_street_name):
    """
    this function generates address from planning data that was provided
    sadly it does not always works well and relies on many heursitics as data quality is limited
    """

    if site_name != None:
        site_name = site_name.strip()
    if site_number != None:
        site_number = site_number.strip()
    if street_name != None:
        street_name = street_name.strip()
    if secondary_street_name != None:
        secondary_street_name = secondary_street_name.strip()

    if site_name == "":
        site_name = None
    if site_number == "":
        site_number = None
    if street_name == "":
        street_name = None
    if secondary_street_name == "":
        secondary_street_name = None
    data = {
        'site_name': site_name, 
        'site_number': site_number, 
        'street_name': street_name, 
        'secondary_street_name': secondary_street_name, 
        }

    if site_name == site_number == street_name == secondary_street_name == None:
        return {'result': None, 'data': data}

    if secondary_street_name != None:
        if street_name == None:
            print('raise Exception("secondary_street_name != None, street_name == None")')
            show_data(site_name, site_number, street_name, secondary_street_name, "???????")
            #raise Exception("secondary_street_name != None, street_name == None")
        else:
            street_name += " - with secondary road name: " + secondary_street_name

    if site_number != None and street_name != None:
        address = site_number + " " + street_name
        if site_name != None:
            print('raise Exception("site_name != None and site_number != None and street_name != None")')
            show_data(site_name, site_number, street_name, secondary_street_name, address)
            #raise Exception("site_name != None and site_number != None")

        return {'result': address, 'data': data}

    if site_name != None:
        if street_name != None:
            try:
                if site_number == None and int(site_name):
                    return {'result': site_name + " " + street_name, 'data': data}
            except ValueError:
                pass
            if street_name in site_name:
                site_name_without_street_name = site_name.replace(street_name, "").strip()
                try:
                    house_number = int(site_name_without_street_name)
                    # so it appears to be case like
                    # site_name: 5 Warwick Road
                    # street_name: Warwick Road
                    # no other info provided
                    # in such case just returning site_name will work fine...
                    return {'result': site_name, 'data': data}
                except ValueError:
                    pass
            print('raise Exception("site_name != None and street_name != None")')
            show_data(site_name, site_number, street_name, secondary_street_name, site_name)
            #raise Exception("site_name != None and street_name != None")
        if site_number != None:
            print('raise Exception("site_name != None and site_number != None")')
            show_data(site_name, site_number, street_name, secondary_street_name, site_name)
            #raise Exception("site_name != None and site_number != None")
        return {'result': site_name, 'data': data}
    else:
        if street_name != None:
            if site_number != None:
                return {'result': site_number + " " + street_name, 'data': data}
        if street_name != None and site_number == None:
            print('raise Exception("street_name != None or site_number == None")')
            show_data(site_name, site_number, street_name, secondary_street_name, None)
            #raise Exception("street_name != None or site_number == None")
            return {'result': None, 'data': data}
        if street_name == None and site_number != None:
            print('raise Exception("street_name == None or site_number != None")')
            show_data(site_name, site_number, street_name, secondary_street_name, None)
            #raise Exception("street_name == None or site_number != None")
            return {'result': None, 'data': data}
        return {'result': None, 'data': data}


def show_data(site_name, site_number, street_name, secondary_street_name, address):
    print("site_name:", site_name)
    print("site_number:", site_number)
    print("street_name:", street_name)
    print("secondary_street_name:", secondary_street_name)
    print("address:", address)
    print()
    print()