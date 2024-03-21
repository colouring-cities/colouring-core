import json
import datetime
import os
import requests
import psycopg2
import address_data
import time


def main():
    connection = get_connection()
    cursor = get_cursor_from_connection(connection)
    execute_database_command(cursor, "TRUNCATE planning_data")

    downloaded = 0
    last_sort = None
    search_after = []
    unexpected_status_statistics = {}
    while True:
        data = query(search_after).json()
        unexpected_status_statistics = load_data_into_database(
            cursor, data, unexpected_status_statistics)
        for entry in data["hits"]["hits"]:
            downloaded += 1
            last_sort = entry["sort"]
        print(
            "downloaded", downloaded, "last_sort", last_sort, "previous", search_after
        )
        if search_after == last_sort:
            break
        search_after = last_sort
    print("unexpected_status_statistics")
    for code, occurences in unexpected_status_statistics.items():
        print(code, "x" + str(occurences))
    print()
    print("popular values in unexpected_status_statistics")
    for code, occurences in unexpected_status_statistics.items():
        if occurences > 100:
            print(code, "x" + str(occurences))
    connection.commit()


def get_cursor_from_connection(connection):
    return connection.cursor()


def execute_database_command(cursor, command, passed_values=None):
    if passed_values is not None:
        cursor.execute(command, passed_values)
    else:
        cursor.execute(command)


def get_connection():
    return psycopg2.connect(
        host=os.environ["PGHOST"],
        dbname=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
    )


def load_data_into_database(cursor, data, unexpected_status_statistics):
    if "timed_out" not in data:
        print(json.dumps(data, indent=4))
        print("timed_out field missing in provided data")
    else:
        if data["timed_out"]:
            raise Exception("query getting livestream data has failed")
    for entry in data["hits"]["hits"]:
        try:
            description = None
            if entry["_source"]["description"] is not None:
                description = entry["_source"]["description"].strip()
            application_id = entry["_source"]["lpa_app_no"]
            application_id_with_borough_identifier = entry["_source"]["id"]
            decision_date = parse_date_string_into_date_object(
                entry["_source"]["decision_date"]
            )
            last_synced_date = parse_date_string_into_date_object(
                entry["_source"]["last_synced"]
            )
            uprn = entry["_source"]["uprn"]
            status_before_aliasing = entry["_source"]["status"]
            status_info = process_status(
                status_before_aliasing, decision_date, unexpected_status_statistics)
            unexpected_status_statistics = status_info['unexpected_status_statistics']
            status = status_info["status"]
            status_explanation_note = status_info["status_explanation_note"]
            planning_url = obtain_entry_link(
                entry["_source"]["url_planning_app"], application_id
            )
            if uprn is None:
                continue
            try:
                uprn = int(uprn)
            except ValueError as e:
                print(e)
                continue
            entry = {
                "description": description,
                "decision_date": decision_date,
                "last_synced_date": last_synced_date,
                "application_id": application_id,
                "application_url": planning_url,
                "registered_with_local_authority_date": parse_date_string_into_date_object(
                    entry["_source"]["valid_date"]
                ),
                "uprn": uprn,
                "status": status,
                "status_before_aliasing": status_before_aliasing,
                "status_explanation_note": status_explanation_note,
                "data_source": "the Greater London Authority's Planning London Datahub",
                "data_source_link": "https://www.london.gov.uk/programmes-strategies/planning/digital-planning/planning-london-datahub",
                "address": address_data.planning_data_entry_to_address(entry),
            }
            if entry["address"] is not None:
                maximum_address_length = 300
                if len(entry["address"]) > maximum_address_length:
                    print("address is too long, shortening", entry["address"])
                    entry["address"] = entry["address"][0:maximum_address_length]
            entry = throw_away_invalid_dates(entry)
            if "Hackney" in application_id_with_borough_identifier:
                if entry["application_url"] is not None:
                    if "https://" not in entry["application_url"]:
                        entry[
                            "application_url"
                        ] = f"https://developmentandhousing.hackney.gov.uk{entry['application_url']}"
            insert_entry(cursor, entry)
        except TypeError as e:
            print()
            print()
            print()
            print(e)
            print()
            show_dictionary(entry)
            raise e
    return unexpected_status_statistics


def throw_away_invalid_dates(entry):
    for date_code in ["registered_with_local_authority_date", "decision_date", "last_synced_date"]:
        if date_in_future(entry[date_code]):
            print(
                date_code + " is treated as invalid:",
                entry[date_code],
            )
            # Brent-87_0946 has "valid_date": "23/04/9187"
            entry[date_code] = None

        if entry[date_code] != None:
            # not believable values
            if entry[date_code] < datetime.datetime(1950, 1, 1):
                print(
                    date_code, "Unexpectedly early date, treating it as a missing date:", entry[date_code])
                entry[date_code] = None
    return entry


def date_in_future(date):
    if date is None:
        return False
    return date > datetime.datetime.now()


def query(search_after):
    headers = {
        "X-API-AllowRequest": os.environ["PLANNNING_DATA_API_ALLOW_REQUEST_CODE"],
        # Already added when you pass json= but not when you pass data=
        # 'Content-Type': 'application/json',
    }
    json_data = {
        "size": 10000,
        "sort": [
            {
                "last_updated": {
                    "order": "desc",
                    "unmapped_type": "boolean",
                },
            },
        ],
        "stored_fields": [
            "*",
        ],
        "_source": {
            "excludes": [],
        },
        "query": {
            "bool": {
                "must": [
                    {
                        "range": {
                            "valid_date": {
                                "gte": "01/01/1021",
                            },
                        },
                    },
                ],
            },
        },
    }

    if search_after != []:
        json_data["search_after"] = search_after

    print(json_data)
    return make_api_call("https://planningdata.london.gov.uk/api-guest/applications/_search", headers, json_data)


def make_api_call(url, headers, json_data):
    while True:
        try:
            return requests.post(
                url,
                headers=headers,
                json=json_data,
            )
        except requests.exceptions.ConnectionError as e:
            print(e)
            sleep_before_retry(
                "requests.exceptions.ConnectionError", url, headers, json_data)
            continue
        except requests.exceptions.HTTPError as e:
            print(e.response.status_code)
            if e.response.status_code == 503:
                sleep_before_retry(
                    "requests.exceptions.HTTPError", url, headers, json_data)
                continue
            raise e
        except requests.exceptions.ReadTimeout as e:
            print(e)
            sleep_before_retry(
                "requests.exceptions.ReadTimeout", url, headers, json_data)
            continue
        except requests.exceptions.ChunkedEncodingError as e:
            print(e)
            sleep_before_retry(
                "requests.exceptions.ChunkedEncodingError", url, headers, json_data)
            continue


def sleep_before_retry(message, url, headers, json_data):
    time.sleep(10)
    print(message, url, headers, json_data)


def filepath():
    return os.path.dirname(os.path.realpath(__file__)) + os.sep + "data.json"


def insert_entry(cursor, e):
    try:
        now = datetime.datetime.now()
        application_url = None
        if e["application_url"] is not None:
            application_url = e["application_url"]
        execute_database_command(cursor,
                                 """INSERT INTO
                planning_data (planning_application_id, planning_application_link, description, registered_with_local_authority_date, days_since_registration_cached, decision_date, days_since_decision_date_cached, last_synced_date, status, status_before_aliasing, status_explanation_note, data_source, data_source_link, address, uprn)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
                                 (
                                     e["application_id"],
                                     application_url,
                                     e["description"],
                                     date_object_into_date_string(
                                         e["registered_with_local_authority_date"]),
                                     days_since(
                                         e["registered_with_local_authority_date"], now),
                                     date_object_into_date_string(
                                         e["decision_date"]),
                                     days_since(e["decision_date"], now),
                                     date_object_into_date_string(
                                         e["last_synced_date"]),
                                     e["status"],
                                     e["status_before_aliasing"],
                                     e["status_explanation_note"],
                                     e["data_source"],
                                     e["data_source_link"],
                                     e["address"],
                                     e["uprn"],
                                 ),
                                 )
    except psycopg2.errors.Error as error:
        show_dictionary(e)
        raise error


def show_dictionary(data):
    for key in data.keys():
        print(key, "=", data[key])


def days_since(date, now):
    if date is None:
        return None
    return (now - date).days


def date_object_into_date_string(date):
    if date is None:
        return None
    return datetime.datetime.strftime(date, "%Y-%m-%d")


def parse_date_string_into_date_object(incoming):
    if incoming is None:
        return None
    date = None
    try:
        date = datetime.datetime.strptime(incoming, "%d/%m/%Y")  # '21/07/2022'
    except ValueError:
        date = datetime.datetime.strptime(
            incoming, "%Y-%m-%dT%H:%M:%S.%fZ"
        )  # '2022-08-08T20:07:22.238Z'
    return date


def obtain_entry_link(provided_link, application_id):
    if provided_link is not None:
        if "Ealing" in application_id:
            if ";" == provided_link[-1]:
                return provided_link[:-1]
        return provided_link
    application_id = str(application_id)  # in some responses it is an integer
    if "Hackney" in application_id:
        # https://cl-staging.uksouth.cloudapp.azure.com/view/planning/1377846
        # Planning application ID: Hackney-2021_2491
        # https://developmentandhousing.hackney.gov.uk/planning/index.html?fa=getApplication&reference=2021/2491
        ref_for_link = application_id.replace("Hackney-", "").replace("_", "/")
        return f"https://developmentandhousing.hackney.gov.uk/planning/index.html?fa=getApplication&reference={ref_for_link}"
    if "Lambeth" in application_id:
        # sadly, specific links seems impossible
        return "https://planning.lambeth.gov.uk/online-applications/refineSearch.do?action=refine"
    if "Barnet" in application_id:
        # sadly, specific links seems impossible
        return "https://publicaccess.barnet.gov.uk/online-applications/"
    if "Kingston" in application_id:
        # sadly, specific links seems impossible
        return "https://publicaccess.kingston.gov.uk/online-applications/"
    if "Sutton" in application_id:
        # sadly, specific links seems impossible
        return "https://publicaccess.sutton.gov.uk/online-applications/"
    if "Croydon" in application_id:
        # sadly, specific links seems impossible
        return "https://publicaccess3.croydon.gov.uk/online-applications/"
    if "Bromley" in application_id:
        # sadly, specific links seems impossible
        return "https://searchapplications.bromley.gov.uk/online-applications/"
    if "Bexley" in application_id:
        # sadly, specific links seems impossible
        return "https://pa.bexley.gov.uk/online-applications/search.do?action=simple&searchType=Application"
    if "Newham" in application_id:
        # sadly, specific links seems impossible
        return "https://pa.newham.gov.uk/online-applications/"
    if "Westminster" in application_id:
        # sadly, specific links seems impossible
        return "https://idoxpa.westminster.gov.uk/online-applications/"
    if "Enfield" in application_id:
        # sadly, specific links seems impossible
        return "https://planningandbuildingcontrol.enfield.gov.uk/online-applications/"
    if "Southwark" in application_id:
        # sadly, specific links seems impossible
        return "https://planning.southwark.gov.uk/online-applications/"
    if "Hammersmith" in application_id:
        return "https://public-access.lbhf.gov.uk/online-applications/search.do?action=simple&searchType=Application"
    if "City_of_London" in application_id:
        return "https://www.planning2.cityoflondon.gov.uk/online-applications/"
    return None
    # Richmond is simply broken


def process_status(status, decision_date, unexpected_status_statistics):
    status_length_limit = 50  # see migrations/034.planning_livestream_data.up.sql
    if status is None:
        status = "Unknown"
    canonical_status = status.lower().strip()
    if canonical_status in ["null", "not_mapped", "", "not known"]:
        status = "Unknown"
    if canonical_status in ["application under consideration", "application received"]:
        if decision_date is None:
            status = "Submitted"
        else:
            print(status, "but with", decision_date,
                  "marking as unknown status")
            status = "Unknown"
    if canonical_status in [
        "refused",
        "refusal",
        "refusal (p)",
        "application invalid",
        "insufficient fee",
        "dismissed",
        "rejected",
    ]:
        status = "Rejected"
    if canonical_status in ["appeal received", "appeal in progress", "refusal (appealed)", "refusal (p) (appealed)"]:
        status = "Appeal In Progress"
    if canonical_status in ["completed", "allowed", "allow", "approval", "approved"]:
        status = "Approved"
    if canonical_status in ["lapsed", "withdrawn"]:
        status = "Withdrawn"
    if len(status) > status_length_limit:
        print("Status was too long and was skipped:", status)
        return {
            "status": "Processing failed",
            "status_explanation_note": "status was unusually long and it was impossible to save it",
            "unexpected_status_statistics": unexpected_status_statistics,
        }
    if status in [
        "Submitted",
        "Approved",
        "Rejected",
        "Appeal In Progress",
        "Withdrawn",
        "Unknown",
    ]:
        return {
            "status": status,
            "status_explanation_note": None,
            "unexpected_status_statistics": unexpected_status_statistics,
        }
    if canonical_status in [
        "no objection to proposal (obs only)",
        "objection raised to proposal (obs only)",
    ]:
        return {
            "status": "Approved",
            "status_explanation_note": "preapproved application, local authority is unable to reject it",
            "unexpected_status_statistics": unexpected_status_statistics,
        }
    print("Unexpected status <" + status + ">")
    if status not in unexpected_status_statistics:
        unexpected_status_statistics[status] = 0
    unexpected_status_statistics[status] += 1
    return {
        "status": status,
        "status_explanation_note": None,
        "unexpected_status_statistics": unexpected_status_statistics,
    }


if __name__ == "__main__":
    main()
