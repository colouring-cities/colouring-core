export class ArgumentError extends Error {
    public argumentName: string;
    constructor(message?: string, argumentName?: string) {
        super(message);
        this.name = 'ArgumentError';
        this.argumentName = argumentName;
    }
}

export class DatabaseError extends Error {
    public detail: any;
    constructor(detail?: string) {
        super();
        this.name = 'DatabaseError';
        this.detail = detail;
    }
}

export class DomainLogicError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'DomainLogicError';
    }
}
