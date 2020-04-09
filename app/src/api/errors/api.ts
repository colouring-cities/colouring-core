/**
 * Note that custom errors and the instanceof operator in TS work together
 * only when transpiling to ES2015 and up.
 * For earier target versions (ES5), a workaround is required:
 * https://stackoverflow.com/questions/41102060/typescript-extending-error-class
 */

export class ApiUserError extends Error {
    public originalError: Error;
    constructor(message?: string, originalError?: Error) {
        super(message);
        this.name = 'ApiUserError';
        this.originalError = originalError;
    }
}

export class ApiParamError extends ApiUserError {
    public paramName: string;

    constructor(message?: string, originalError?: Error, paramName?: string) {
        super(message, originalError);
        this.name = 'ApiParamError';
        this.paramName = paramName;
    }
}

export class ApiParamRequiredError extends ApiParamError {
    constructor(message?: string, originalError?: Error) {
        super(message, originalError);
        this.name = 'ApiParamRequiredError';
    }
}

export class ApiParamInvalidFormatError extends ApiParamError {
    constructor(message?: string, originalError?: Error) {
        super(message, originalError);
        this.name = 'ApiParamInvalidFormatError';
    }
}
