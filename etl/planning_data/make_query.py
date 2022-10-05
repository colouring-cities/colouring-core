from requests.structures import CaseInsensitiveDict
import requests
import time
import json

def obtain_data(data):
    url = "https://planningdata.london.gov.uk/dashboard/internal/search/es"
    headers = headers_of_query()
    response = requests.post(url, headers=headers, data=json.dumps(data))
    # typically initially return something like that
    # {'id': 'Fmo0RW9DX0k5U3UtLWJIVlEtMzRwR3cfdGwtYkJaaHNUeG1GdF9kRHFtQldaUToxODczMzM5Nw==', 'is_partial': True, 'is_running': True, 'rawResponse': {'took': 100, 'timed_out': False, 'terminated_early': False, 'num_reduce_phases': 0, '_shards': {'total': 1, 'successful': 0, 'skipped': 0, 'failed': 0}, 'hits': {'total': 0, 'max_score': None, 'hits': []}}, 'total': 1, 'loaded': 0}

    if response.status_code != 200:
        raise Exception("unexpected status code " + str(response.status_code))

    output = response.content.decode('utf-8')

    output = json.loads(output)
    if output["is_partial"]:
        identifier = output["id"]
        while output["is_partial"]:
            time.sleep(3)
            response = reask_for_query_results(identifier)
            output = json.loads(response.content.decode('utf-8'))
            if response.status_code != 200:
                raise Exception("unexpected status code " +
                                str(response.status_code))
    return output

def headers_of_query():
    headers = CaseInsensitiveDict()
    headers["User-Agent"] = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0"
    headers["Accept"] = "*/*"
    headers["Referer"] = "https://planningdata.london.gov.uk/dashboard/app/discover"
    headers["Content-Type"] = "application/json"
    headers["kbn-version"] = "7.9.3"
    headers["Origin"] = "https://planningdata.london.gov.uk"
    headers["Connection"] = "keep-alive"
    headers["Sec-Fetch-Dest"] = "empty"
    headers["Sec-Fetch-Mode"] = "cors"
    headers["Sec-Fetch-Site"] = "same-origin"
    headers["TE"] = "trailers"
    return headers

def reask_for_query_results(identifier):
    data = {'id': identifier}
    return requests.post(
        'https://planningdata.london.gov.uk/dashboard/internal/search/es',
        data=data,
        timeout=100000,
        headers={
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0',
            'kbn-version': '7.9.3',
        }
    )
