/**
 * A function to be passed to JSON.parse as a JSON reviver, in order to transform date values
 * (which don't have a native JSON representation and therefore are serialized as strings)
 * back to a JavaScript Date object.
 * This works by first checking if a string value complies with a date format
 * and then converting to a Date if and only if that's the case
 * @param name name of the JSON field to revive
 * @param value value of the JSON field to revive
 */
export function dateReviver(name, value) {
    if (typeof value === "string" && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
        return new Date(value);
    }
    return value;
}


export function parseJsonOrDefault(jsonString: string) {
    try {
        return JSON.parse(jsonString);
    } catch(error) {
        console.error(error);
        return null;
    }
}

export function hasAnyOwnProperty(obj: {}, keys: string[]) {
    return keys.some(k => obj.hasOwnProperty(k));
}
