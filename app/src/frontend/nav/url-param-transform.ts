export interface UrlParamTransform<T> {
    fromParam: (x: string) => T;
    toParam: (x: T) => string;
}

const identity: <T>(x: T) => T = (x) => x;

export const stringParamTransform: UrlParamTransform<string> = {
    fromParam: identity,
    toParam: identity
};

export const intParamTransform: UrlParamTransform<number> = {
    fromParam: x => parseInt(x, 10),
    toParam: x => x.toString()
};
