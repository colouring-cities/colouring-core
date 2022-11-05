import requests
import json
import json
import datetime
import psycopg2
import os


def main():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("TRUNCATE planning_data")

    downloaded = 0
    last_sort = None
    search_after = []
    while True:
        data = query(search_after).json()
        load_data_into_database(cursor, data)
        for entry in data['hits']['hits']:
            downloaded += 1
            last_sort = entry['sort']
        print("downloaded", downloaded, "last_sort", last_sort, "previous", search_after)
        if search_after == last_sort:
            break
        search_after = last_sort
    connection.commit()



def load_data_into_database(cursor, data):
    if "timed_out" not in data:
        print(json.dumps(data, indent = 4))
        print("timed_out field missing in provided data")
    else:
        if data['timed_out']:
            raise Exception("query getting livestream data has failed")
    for entry in data['hits']['hits']:
        try:
            description = None
            if entry['_source']['description'] != None:
                description = entry['_source']['description'].strip()
            application_id = entry['_source']['id']
            decision_date = parse_date_string_into_datestring(entry['_source']['decision_date'])
            last_synced_date = parse_date_string_into_datestring(entry['_source']['last_synced'])
            uprn = entry['_source']['uprn']
            status_before_aliasing = entry['_source']['status']
            status = process_status(status_before_aliasing, decision_date)
            if uprn == None:
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
                "application_url": entry['_source']['url_planning_app'],
                "registered_with_local_authority_date": parse_date_string_into_datestring(entry['_source']['valid_date']),
                "uprn": uprn,
                "status": status,
                "status_before_aliasing": status_before_aliasing,
                "data_source": "Greater London Authority's Planning London DataHub",
                "data_source_link": None
                }
            if "Hackney" in entry["application_id"]:
                if entry["application_url"] != None:
                    if "https://" not in entry["application_url"]:
                        entry["application_url"] = "https://developmentandhousing.hackney.gov.uk" + entry["application_url"]
            insert_entry(cursor, entry)
        except TypeError as e:
            print()
            print()
            print()
            print(e)
            print()
            print(json.dumps(entry, indent = 4))

def query(search_after):
    headers = {
        'X-API-AllowRequest': os.environ['PLANNNING_DATA_API_ALLOW_REQUEST_CODE'],
        # Already added when you pass json= but not when you pass data=
        # 'Content-Type': 'application/json',
    }
    json_data = {
        'size': 10000,
        'sort': [
            {
                'last_updated': {
                    'order': 'desc',
                    'unmapped_type': 'boolean',
                },
            },
        ],
        'stored_fields': [
            '*',
        ],
        '_source': {
            'excludes': [],
        },
        'query': {
            'bool': {
                'must': [
                    {
                        'range': {
                            'valid_date': {
                                'gte': '01/01/1021',
                            },
                        },
                    },
                ],
            },
        },
    }

    if search_after != []:
        json_data['search_after'] = search_after

    print(json_data)
    return requests.post('https://planningdata.london.gov.uk/api-guest/applications/_search', headers=headers, json=json_data)

def get_connection():
    return psycopg2.connect(
        host=os.environ['PGHOST'],
        dbname=os.environ['PGDATABASE'],
        user=os.environ['PGUSER'],
        password=os.environ['PGPASSWORD']
    )

def filepath():
    return os.path.dirname(os.path.realpath(__file__)) + os.sep + "data.json"

def insert_entry(cursor, e):
    elements = []
    application_url = None
    if e["application_url"] != None:
        application_url = e["application_url"]
    cursor.execute('''INSERT INTO
            planning_data (planning_application_id, planning_application_link, description, registered_with_local_authority_date, decision_date, last_synced_date, status, status_before_aliasing, data_source, data_source_link, uprn)
        VALUES
            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (e["application_id"], application_url, e["description"], e["registered_with_local_authority_date"], e["decision_date"], e["last_synced_date"], e["status"], e["status_before_aliasing"], e["data_source"], e["data_source_link"], e["uprn"]))

def parse_date_string_into_datestring(incoming):
    if incoming == None:
        return None
    date = None
    try:
        date = datetime.datetime.strptime(incoming, "%d/%m/%Y") # '21/07/2022'
    except ValueError:
        date = datetime.datetime.strptime(incoming, "%Y-%m-%dT%H:%M:%S.%fZ") # '2022-08-08T20:07:22.238Z'
    return datetime.datetime.strftime(date, "%Y-%m-%d")

def process_status(status, decision_date):
    """return None if status is invalid"""
    if status in ["Application Under Consideration", "Application Received"]:
        if decision_date == None:
            status = "Submitted"
    if status in ["Refused", "Refusal", "Refusal (P)", "Application Invalid", "Insufficient Fee", "Dismissed"]:
        status = "Rejected"
    if status == "Appeal Received":
        status = "Appeal In Progress"
    if status in ["Completed", "Allowed", "Approval"]:
        status = "Approved"
    if status in [None, "NOT_MAPPED"]:
        status = "Unknown"
    if (status in ["Submitted", "Approved", "Rejected", "Appeal In Progress", "Withdrawn", "Unknown"]):
        return status
    print("Unexpected status " + status)
    if status not in ["No Objection to Proposal (OBS only)", "Objection Raised to Proposal (OBS only)", "Not Required", "Unknown", "Lapsed", "SECS", "Comment Issued", "ALL DECISIONS ISSUED", "Closed", "Declined to Determine"]:
        print("New unexpected status " + status)
    status_length_limit = 50 # see migrations/033.planning_livestream_data.up.sql
    if len(status) > 50:
        print("Status was too long and was skipped:", status)
        return None
    return status

if __name__ == '__main__':
    main()
