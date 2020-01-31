/**
 * Note that custom errors and the instanceof operator in TS work together
 * only when transpiling to ES2015 and up.
 * For earier target versions (ES5), a workaround is required:
 * https://stackoverflow.com/questions/41102060/typescript-extending-error-class
 */

export class ApiUserError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'ApiUserError';
    }
}

export class ApiParamError extends ApiUserError {
    public paramName: string;

    constructor(message?: string, paramName?: string) {
        super(message);
        this.name = 'ApiParamError';
        this.paramName = paramName;
    }
}

export class ApiParamRequiredError extends ApiParamError {
    constructor(message?: string) {
        super(message);
        this.name = 'ApiParamRequiredError';
    }
}

export class ApiParamOutOfBoundsError extends ApiParamError {
    constructor(message?: string) {
        super(message);
        this.name = 'ApiParamOutOfBoundsError';
    }
}

export class ApiParamInvalidFormatError extends ApiParamError {
    constructor(message?: string) {
        super(message);
        this.name = 'ApiParamInvalidFormatError';
    }
}
