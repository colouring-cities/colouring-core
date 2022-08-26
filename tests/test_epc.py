import pytest
from etl import floor_level_to_int


def test_floor_level_to_int():
    """Test that differently formatted floors can correctly converted."""
    test_levels = ['01', '02', '1st', '2nd', '3rd', '4th', '1', '2', '0',
                   'Ground', 'NODATA!', 'mid floor', 'Basement', 'ground floor', '21st or above',
                   'top floor', '00', '20+', None, 5]
    expected = [1, 2, 1, 2, 3, 4, 1, 2, 0, 0, 0, 1, -1, 0, 21, 2, 0, 20, 0, 5]
    for lvl, ex in zip(test_levels, expected):
        assert floor_level_to_int(lvl) == ex