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

export function hasAnyOwnProperty<T>(obj: T, keys: (keyof T)[]) {
    return keys.some(k => obj.hasOwnProperty(k));
}

export function isNullishOrEmpty(obj: any) {
    return obj == undefined || isEmptyArray(obj);
}
export function isEmptyArray(obj: any) {
    return Array.isArray(obj) && obj.length === 0;
}

type AccessorFunction<T, V> = (obj: T) => V;

type CompareFunction<T> = (a: T, b: T) => number;

export function numAsc<T, V extends number | bigint>(accessor: AccessorFunction<T, V>): CompareFunction<T>{
    return (a: T, b: T) => Number(accessor(a) - accessor(b));
}

export function numDesc<T, V extends number | bigint>(accessor: AccessorFunction<T, V>): CompareFunction<T> {
    return (a: T, b: T) => Number(accessor(b) - accessor(a));
}

/** 
 * As of Jan 2020, bigint literals e.g. 1n can only be used with TS target esnext
 * which then doesn't transpile the null conditional/coalescing operators and breaks on Node 12
 * So BigInt(1) needs to be used here
 * */ 
export function incBigInt(bigStr: string): string {
    return bigStr == undefined ? bigStr : String(BigInt(bigStr) + BigInt(1));
}
export function decBigInt(bigStr: string): string {
    return bigStr == undefined ? bigStr : String(BigInt(bigStr) - BigInt(1));
}

export function parseBooleanExact(val: string) {
    if(val === 'true') return true;
    if(val === 'false') return false;
    return null;
}

export function pickFields(obj: any, fieldWhitelist: Set<string>) {
    const subObject = {};
    for (let [key, value] of Object.entries(obj)) {
        if(fieldWhitelist.has(key)) {
            subObject[key] = value;
        }
    }
    return subObject;
}

/**
 * Generic type for a function validating that the argument is a object with 
 * Used to enforce value types in a config object, but not obscuring the key names
 * by using a TS lookup type
 */
type ValueTypeCheck<C> = <K extends string>(x: Record<K, C>) => Record<K, C>;

/**
 * Creates a function that enforces all fields of its argument to be of type C
 * Useful to create configs where each field must be of a set type,
 * but the list of keys should be accessible to users of the config variable.
 */
export function valueType<C>(): ValueTypeCheck<C>{
    return x => x;
}

/**
 * Map all properties of object through a function
 */
export function mapObject<T, R>(x: T, fn: ([key, value]: [keyof T, T[keyof T]]) => R): Record<keyof T, R> {
    return Object.assign({}, ...Object.entries(x).map(([key, value]) => ({ [key]: fn([key as keyof T, value]) })) );
}