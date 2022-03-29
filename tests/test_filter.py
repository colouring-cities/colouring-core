import csv
import pytest
from etl import filter_mastermap


def test_filter_mastermap():
    """Test that MasterMap CSV can be correctly filtered to include only buildings."""
    input_file = "tests/test_mastermap.gml.csv"  # Test csv with two buildings and one non-building
    output_file = input_file.replace('gml', 'filtered')
    filter_mastermap(input_file)  # creates output_file
    with open(output_file, newline='') as csvfile:
        csv_array = list(csv.reader(csvfile))
    assert len(csv_array) == 3  # assert that length is 3 because just two building rows after header
    
    
def test_filter_mastermap_missing_descriptivegroup():
    """Test that MasterMap CSV can be correctly filtered when the polygon does not have a type specified."""
    input_file = "tests/test_mastermap_missing_descriptivegroup.gml.csv"  # Test csv with one building and one non-building
    output_file = input_file.replace('gml', 'filtered')
    filter_mastermap(input_file)  # creates output_file
    with open(output_file, newline='') as csvfile:
        csv_array = list(csv.reader(csvfile))
    assert len(csv_array) == 1  # assert that length is 1 because just header