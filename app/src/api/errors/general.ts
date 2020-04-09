export class UserError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'UserError';
    }
}

export class ArgumentError extends UserError {
    public argumentName: string;
    constructor(message?: string, argumentName?: string) {
        super(message);
        this.name = 'ArgumentError';
        this.argumentName = argumentName;
    }
}

export class InvalidOperationError extends UserError {
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidOperationError';
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
