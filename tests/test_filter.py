import pytest
from etl import filter_mastermap

def test_filter_mastermap():
    """Test that MasterMap CSV can be correctly filtered to include only buildings."""
    input_file = ""
    expected_output = ""
    assert filter_mastermap(input_file) == expected_output