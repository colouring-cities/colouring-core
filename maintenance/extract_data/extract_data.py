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




def make_data_extract(current_time, connection, zip_file_path):
    if zip_file_path.exists():
        raise ZipFileExistsError('Archive file under specified name already exists')

    # Execute data dump as Postgres COPY commands, write from server to /tmp
    with connection.cursor() as cur:
        cur.execute(read_sql('./export_attributes.sql'))

    with connection.cursor() as cur:
        cur.execute(read_sql('./export_uprns.sql'))

    with connection.cursor() as cur:
        cur.execute(read_sql('./export_edit_history.sql'))

    zip_file_path.parent.mkdir(parents=True, exist_ok=True)

    source_dir_path = Path(__file__).parent

    try:
        with zipfile.ZipFile(zip_file_path, mode='w') as newzip:
            newzip.write(source_dir_path / 'README.txt', arcname='README.txt')
            newzip.write('/tmp/building_attributes.csv', arcname='building_attributes.csv')
            newzip.write('/tmp/building_uprns.csv', arcname='building_uprns.csv')
            newzip.write('/tmp/edit_history.csv', arcname='edit_history.csv')

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
