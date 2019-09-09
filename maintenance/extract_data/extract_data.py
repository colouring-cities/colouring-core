#!/usr/bin/env python3

import csv
import datetime
from io import StringIO
import os
from pathlib import Path
import zipfile

import psycopg2


class ZipFileExistsError(Exception):
    pass

def get_connection():
    return psycopg2.connect(
        host=os.environ['PGHOST'],
        dbname=os.environ['PGDATABASE'],
        user=os.environ['PGUSER'],
        password=os.environ['PGPASSWORD']
    )


def fetch_with_server_side_cursor(
    connection,
    query,
    on_row,
    row_batch_size=10000
):
    with connection.cursor('server_side') as cur:
        cur.itersize = row_batch_size
        cur.execute(query)

        header_saved = False

        for row in cur:
            if not header_saved:
                columns = [c[0] for c in cur.description]
                on_row(columns)
                header_saved = True
            on_row(row)


def db_to_csv(connection, query):
    string_io = StringIO()
    writer = csv.writer(string_io)

    fetch_with_server_side_cursor(
        connection,
        query,
        lambda row: writer.writerow(row)
    )

    return string_io.getvalue()


def get_extract_zip_file_path(current_time):
    base_dir = Path(os.environ['EXTRACTS_DIRECTORY'])
    file_name = f"data-extract-{current_time:%Y-%m-%d-%H_%M_%S}.zip"
    return base_dir / file_name


def add_extract_record_to_database(connection, zip_file_path, extracted_time):
    with connection.cursor() as cur:
        truncated_time = extracted_time.replace(second=0, microsecond=0)
        cur.execute('''INSERT INTO
                bulk_extracts (extracted_on, extract_path)
            VALUES
                (%s, %s)
        ''', (truncated_time, str(zip_file_path)))

        connection.commit()


def read_sql(rel_path_from_script):
    script_directory = Path(__file__).resolve().parent
    sql_path = script_directory / rel_path_from_script
    return sql_path.read_text()


building_attr_query = read_sql('./export_attributes.sql')
building_uprn_query = read_sql('./export_uprns.sql')
edit_history_query = read_sql('./export_edit_history.sql')


def make_data_extract(current_time, connection, zip_file_path):
    if zip_file_path.exists():
        raise ZipFileExistsError('Archive file under specified name already exists')

    zip_file_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        with zipfile.ZipFile(zip_file_path, mode='w') as newzip:
            newzip.writestr('building_attributes.csv',
                            db_to_csv(connection, building_attr_query))
            newzip.writestr('building_uprns.csv',
                            db_to_csv(connection, building_uprn_query))
            newzip.writestr('edit_history.csv',
                            db_to_csv(connection, edit_history_query))

            # TODO: add README

        add_extract_record_to_database(connection, zip_file_path, current_time)
    except:
        zip_file_path.unlink()
        raise


def main():
    current_time = datetime.datetime.utcnow()
    conn = get_connection()
    zip_file_path = get_extract_zip_file_path(current_time)
    make_data_extract(current_time, conn, zip_file_path)


if __name__ == '__main__':
    main()
