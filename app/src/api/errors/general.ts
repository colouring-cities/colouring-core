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

export class InvalidFieldError extends UserError {
    public fieldName: string;
    constructor(message?: string, fieldName?: string) {
        super(message);
        this.name = 'InvalidFieldError';
        this.fieldName = fieldName;
    }
}

export class FieldTypeError extends UserError {
    public fieldName: string;
    constructor(message?: string, fieldName?: string) {
        super(message);
        this.name = 'FieldTypeError';
        this.fieldName = fieldName;
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
