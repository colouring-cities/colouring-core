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
    return os.path.dirname(os.path.realpath(__file__)) + "data.json"

def insert_entry(connection, entry):
    elements = []
    for e in entries:
        application_url = "NULL"
        if e["application_url"] != None:
            application_url = "'" + e["application_url"] + "'"
        data = [
            "'" + e["application_id"] + "'",
            application_url,
            "'" + e["description"].replace("'", "''") + "'",
            "'" + e["decision_date"] + "'",
            "'" + e["last_synced_date"] + "'",
            "'" + e["status"] + "'",
            "'" + e["data_source"] + "'",
            "'" + e["data_source_link"] + "'",
            e["uprn"],
        ]
    with connection.cursor() as cur:
        truncated_time = extracted_time.replace(second=0, microsecond=0)
        cur.execute('''INSERT INTO
                planning_data (planning_application_id, planning_application_link, description, decision_date, last_synced_date, status, data_source, data_source_link, uprn)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (e["application_id"], application_url, e["description"], e["decision_date"], e["last_synced_date"], e["status"], e["data_source"], e["data_source_link"], e["uprn"]))
        connection.commit()

    return """INSERT INTO planning_data
(planning_application_id, planning_application_link, description, decision_date, last_synced_date, status, data_source, data_source_link, uprn)
VALUES""" + ",\n".join(elements) + ";"


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
        if data['rawResponse']['timed_out']:
            raise Exception("query getting livestream data has failed")
        if data['is_partial']:
            raise Exception("query getting livestream data has failed")
        if data['is_running']:
            raise Exception("query getting livestream data has failed")
        for entry in data['rawResponse']['hits']['hits']:
            description = shorten_description(entry['_source']['description'])
            application_id = entry['_source']['id']
            decision_date = parse_date_string_into_datestring(entry['_source']['decision_date'])
            last_synced_date = parse_date_string_into_datestring(entry['_source']['last_synced'])
            uprn = entry['_source']['uprn']
            status = entry['_source']['status']
            if status in ["No Objection to Proposal (OBS only)", "Not Required", None, "Lapsed", "Unknown", "SECS", "Comment Issued"]:
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
            if (status not in ["Approved", "Rejected", "Appeal In Progress", "Withdrawn", ]):
                raise Exception("Unexpected status " + status)
            description = entry['_source']['description'].strip()
            if uprn == None:
                continue
            entry = {
                "description": description,
                "decision_date": decision_date,
                "last_synced_date": last_synced_date,
                "application_id": application_id,
                "application_url": entry['_source']['url_planning_app'],
                "uprn": uprn,
                "status": status,
                "data_source": "The Planning London DataHub Greater London Authority",
                "data_source_link": "https://data.london.gov.uk/dataset/planning-london-datahub?_gl=1%2aprwpc%2a_ga%2aMzQyOTg0MjcxLjE2NTk0NDA4NTM", # TODO test
                }
            insert_entry(entry)

if __name__ == '__main__':
    main()