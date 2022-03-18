import csv
import pytest
from etl import filter_mastermap


def test_filter_mastermap():
    """Test that MasterMap CSV can be correctly filtered to include only buildings."""
    input_file = "tests/test_mastermap.gml.csv"  # Test csv with one building and one non-building
    filter_mastermap(input_file)  # creates test_mastermap.filtered.csv
    with open('tests/test_mastermap.filtered.csv', newline='') as csvfile:
        csv_array = list(csv.reader(csvfile))
    assert len(csv_array) == 2  # assert that length is 2 because just one row after header