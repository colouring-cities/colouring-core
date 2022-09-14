import json
import datetime
import psycopg2
import os

def get_connection():
    return psycopg2.connect(
        host=os.environ['PGHOST'],
        dbname=os.environ['PGDATABASE'],
        user=os.environ['PGUSER'],
        password=os.environ['PGPASSWORD']
    )

def filepath():
    return os.path.dirname(os.path.realpath(__file__)) + os.sep + "recovered.geojson"

def insert_entry(connection, e):
    print(e)
    elements = []
    application_url = "NULL"
    if e["application_url"] != None:
        application_url = "'" + e["application_url"] + "'"
    with connection.cursor() as cur:
        cur.execute('''INSERT INTO
                planning_data (planning_application_id, planning_application_link, description, registered_with_local_authority_date, decision_date, last_synced_date, status, data_source, data_source_link, uprn)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (e["application_id"], application_url, e["description"], e["registered_with_local_authority_date"], e["decision_date"], e["last_synced_date"], e["status"], e["data_source"], e["data_source_link"], e["uprn"]))
        connection.commit()

def parse_date_string_into_datestring(incoming):
    date = None
    try:
        date = datetime.datetime.strptime(incoming, "%d/%m/%Y") # '21/07/2022'
    except ValueError:
        date = datetime.datetime.strptime(incoming, "%Y-%m-%dT%H:%M:%S.%fZ") # '2022-08-08T20:07:22.238Z'
    return datetime.datetime.strftime(date, "%Y-%m-%d")

def shorten_description(original_description):
    description = original_description.strip()
    limit = 400
    if len(description) > limit:
        description = ""
        for entry in original_description.split():
            extended = description
            if extended != "":
                extended += " "
            extended += entry
            if len(extended) <= limit:
                description = extended
        if description == "":
                description = description[0:limit]
        description += "... <i>(show more)</i>"
    return description

def main():
    connection = get_connection()
    with connection.cursor() as cur:
        cur.execute("TRUNCATE planning_data")
    with open(filepath(), 'r') as content_file:
        data = json.load(content_file)
        for entry in data['features']:
            description = entry['properties']['description']
            application_id = "unknown"
            decision_date = parse_date_string_into_datestring(entry['properties']['decision_date'])
            last_synced_date = parse_date_string_into_datestring(entry['properties']['decision_date'])
            uprn = entry['properties']['uprn']
            status = entry['properties']['status']
            if status in ["No Objection to Proposal (OBS only)", "Not Required", None, "Lapsed", "SECS", "Comment Issued",

            # new ones
            "ALL DECISIONS ISSUED", "Closed", "?", ""
            ]: 
                continue
            if status in []:
                opts = jsbeautifier.default_options()
                opts.indent_size = 2
                print(jsbeautifier.beautify(json.dumps(entry), opts))            
                continue
            if status == "Refused":
                status = "Rejected"
            if status == "Appeal Received":
                status = "Appeal In Progress"
            if (status not in ["Approved", "Rejected", "Appeal In Progress", "Withdrawn", "Unknown"]):
                print("Unexpected status " + status)
                continue
            if uprn == None:
                continue
            entry = {
                "description": description,
                "decision_date": decision_date,
                "last_synced_date": last_synced_date,
                "application_id": application_id,
                "application_url": None,
                "registered_with_local_authority_date": None,
                "uprn": uprn,
                "status": status,
                "data_source": "The Planning London DataHub Greater London Authority",
                "data_source_link": "https://data.london.gov.uk/dataset/planning-london-datahub?_gl=1%2aprwpc%2a_ga%2aMzQyOTg0MjcxLjE2NTk0NDA4NTM", # TODO test
                }
            insert_entry(connection, entry)

if __name__ == '__main__':
    main()
