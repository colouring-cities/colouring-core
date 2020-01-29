/**
 * Note that custom errors and the instanceof operator in TS work together
 * only when transpiling to ES2015 and up.
 * For earier target versions (ES5), a workaround is required:
 * https://stackoverflow.com/questions/41102060/typescript-extending-error-class
 */

export class UserInputError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class RequestParameterError extends UserInputError {
    public paramName: string;

    constructor(message?: string) {
        super(message);
    }
}

export class ParamRequiredError extends RequestParameterError {
    constructor(message?: string) {
        super(message);
    }
}

export class ParamOutOfBoundsError extends RequestParameterError {
    constructor(message?: string) {
        super(message);
    }
}

export class ParamInvalidFormatError extends RequestParameterError {
    constructor(message?: string) {
        super(message);
    }
}
