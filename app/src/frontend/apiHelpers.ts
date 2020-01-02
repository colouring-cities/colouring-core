type JsonReviver = (name: string, value: any) => any;

export function apiGet(path: string, options?: {
    jsonReviver?: JsonReviver
}): Promise<any> {
    return apiRequest(path, 'GET', null, options);
}

export function apiPost(path: string, data?: object, options?: {
    jsonReviver?: JsonReviver
}): Promise<any> {
    return apiRequest(path, 'POST', data, options);
}

export function apiDelete(path: string, options?: {
    jsonReviver?: JsonReviver
}): Promise<any> {
    return apiRequest(path, 'DELETE', null, options);
}

async function apiRequest(
    path: string,
    method: 'GET' | 'POST' | 'DELETE',
    data?: object,
    options?: {
        jsonReviver?: JsonReviver
    }
): Promise<any> {
    const res = await fetch(path, {
        method: method,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data == undefined ? null : JSON.stringify(data),
    });

    const reviver = options == undefined ? undefined : options.jsonReviver;
    if (reviver != undefined) {
        return JSON.parse(await res.text(), reviver);
    } else {
        return await res.json();
    }
}
