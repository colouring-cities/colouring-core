import json
import jsbeautifier

import make_query

def main():
    output = make_query.obtain_data(get_query())
    # print(json.dumps(output))
    opts = jsbeautifier.default_options()
    opts.indent_size = 2
    print(jsbeautifier.beautify(json.dumps(output), opts))


def get_query():
    true = True  # makes possible to copy JSON into Python code
    return {
        "params": {
            "ignoreThrottled": true,
            "index": "applications",
            "body": {
                "version": true,
                "size": 500,
                "sort": [
                    {
                        "last_updated": {
                            "order": "desc",
                            "unmapped_type": "boolean"
                        }
                    }
                ],
                "aggs": {
                    "2": {
                        "date_histogram": {
                            "field": "last_updated",
                            "calendar_interval": "1d",
                            "time_zone": "Europe/London",
                            "min_doc_count": 1
                        }
                    }
                },
                "stored_fields": [
                    "*"
                ],
                "script_fields": {},
                "docvalue_fields": [],
                "_source": {
                    "excludes": []
                },
                "query": {
                    "bool": {
                        "must": [],
                        "filter": [
                            {
                                "range": {
                                    "decision_date": {
                                        "gte": "1922-01-01T00:00:00.000Z",
                                        "format": "strict_date_optional_time"
                                    }
                                }
                            }
                        ],
                        "should": [],
                        "must_not": []
                    }
                },
                "highlight": {
                    "pre_tags": [
                        "@kibana-highlighted-field@"
                    ],
                    "post_tags": [
                        "@/kibana-highlighted-field@"
                    ],
                    "fields": {
                        "*": {}
                    },
                    "fragment_size": 2147483647
                }
            },
            "rest_total_hits_as_int": true,
            "ignore_unavailable": true,
            "ignore_throttled": true,
            "timeout": "30000ms"
        }
    }

if __name__ == '__main__':
    main()
