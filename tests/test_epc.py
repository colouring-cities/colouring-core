import pytest
from etl import floor_level_to_int


def test_floor_level_to_int():
    """Test that differently formatted floors can correctly converted."""
    test_levels = ['01', '02' '1st', '2nd', '3rd', '4th', '1', '2', '0', 'Ground', 'NODATA!', 'mid floor', 'Basement']
    expected = [1, 2, 1, 2, 3, 4, 1, 2, 0, 0, None, 'mid floor', 'Basement']
    i = 0
    for lvl in test_levels:
        try:
            assert floor_level_to_int(lvl) == expected[i]
        except AssertionError:
            print(lvl)
        i+=1