import pytest
from etl import floor_level_to_int, construction_to_int


def test_floor_level_to_int():
    """Test that differently formatted floors can correctly converted."""
    test_levels = ['01', '02', '1st', '2nd', '3rd', '4th', '1', '2', '0',
                   'Ground', 'NODATA!', 'mid floor', 'Basement', 'ground floor', '21st or above',
                   'top floor', '00', '20+', None, 5]
    expected = [1, 2, 1, 2, 3, 4, 1, 2, 0, 0, None, 1, -1, 0, 21, 2, 0, 20, None, 5]
    for lvl, ex in zip(test_levels, expected):
        assert floor_level_to_int(lvl) == ex
        
        
def test_construction_to_int():
    """Test that differently formatted construction ages can correctly converted."""
    test_dates = ['England and Wales: before 1900', None, 'England and Wales: 1991-1996',
                  'NO DATA!', 'England and Wales: 2007 onwards', 'INVALID!', '1950']
    expected  = [1900, None, 1994, None, 2007, None, 1950]
    for date, ex in zip(test_dates, expected):
        assert construction_to_int(date) == ex