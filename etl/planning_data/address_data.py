def planning_data_entry_to_address(element):
    site_name = element["_source"].get("site_name")
    site_number = element["_source"].get("site_number")
    street_name = element["_source"].get("street_name")
    # seems often misused - say "31 COPTHALL ROAD EAST" site_name
    # getting Ickenham street_name
    secondary_street_name = element["_source"].get("secondary_street_name")
    return generate_address(site_name, site_number, street_name, secondary_street_name)[
        "result"
    ]


def generate_address(site_name, site_number, street_name, secondary_street_name):
    """
    this function generates address from planning data that was provided
    sadly it does not always works well and relies on many heuristics as data quality is limited
    """

    if site_name is not None:
        site_name = site_name.strip()
    if site_number is not None:
        site_number = site_number.strip()
    if street_name is not None:
        street_name = street_name.strip()
    if secondary_street_name is not None:
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
        "site_name": site_name,
        "site_number": site_number,
        "street_name": street_name,
        "secondary_street_name": secondary_street_name,
    }

    if site_name == site_number == street_name == secondary_street_name is None:
        return {"result": None, "data": data}

    if secondary_street_name is not None:
        if street_name is None:
            print('"secondary_street_name is not None, street_name is None"')
            show_data(
                site_name, site_number, street_name, secondary_street_name, "???????"
            )
        else:
            street_name += " - with secondary road name: " + secondary_street_name

    if site_number is not None and street_name is not None:
        address = site_number + " " + street_name
        if site_name != None:
            address += " - " + site_name
        # in some cases it results in duplication when site_name repeats
        # address parts, but often it provides useful data

        return {"result": address, "data": data}

    if site_name is not None:
        if street_name is not None:
            try:
                if site_number is None and int(site_name):
                    return {"result": site_name + " " + street_name, "data": data}
            except ValueError:
                pass
            if street_name in site_name:
                site_name_without_street_name = site_name.replace(
                    street_name, ""
                ).strip()
                try:
                    _ = int(site_name_without_street_name)
                    # so it appears to be case like
                    # site_name: 5 Warwick Road
                    # street_name: Warwick Road
                    # no other info provided
                    # in such case just returning site_name will work fine...
                    return {"result": site_name, "data": data}
                except ValueError:
                    pass
            print('"site_name is not None and street_name is not None"')
            show_data(
                site_name, site_number, street_name, secondary_street_name, site_name
            )
        if site_number is not None:
            print('"site_name is not None and site_number is not None"')
            show_data(
                site_name, site_number, street_name, secondary_street_name, site_name
            )
        return {"result": site_name, "data": data}
    else:
        if street_name is not None:
            if site_number is not None:
                return {"result": site_number + " " + street_name, "data": data}
        if street_name is not None and site_number is None:
            print('"street_name is not None or site_number is None"')
            show_data(site_name, site_number, street_name, secondary_street_name, None)
            return {"result": None, "data": data}
        if street_name is None and site_number is not None:
            print('"street_name is None or site_number is not None"')
            show_data(site_name, site_number, street_name, secondary_street_name, None)
            return {"result": None, "data": data}
        return {"result": None, "data": data}


def show_data(site_name, site_number, street_name, secondary_street_name, address):
    print("site_name:", site_name)
    print("site_number:", site_number)
    print("street_name:", street_name)
    print("secondary_street_name:", secondary_street_name)
    print("address generated based on this data:", address)
    print()
    print()
