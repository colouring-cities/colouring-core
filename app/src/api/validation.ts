class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateUsername(username: string): void {
    if (username == undefined) throw new ValidationError('Username is required');
    if (!username.match(/^\w+$/)) throw new ValidationError('Username can only contain alphanumeric characters and underscore');
    if (username.length < 4) throw new ValidationError('Username must be at least 4 characters long');
    if (username.length > 30) throw new ValidationError('Username must be at most 30 characters long');
}

function validatePassword(password: string): void {
    if (password == undefined) throw new ValidationError('Password is required');
    if (password.length < 8) throw new ValidationError('Password must be at least 8 characters long');
    if (password.length > 128) throw new ValidationError('Password must be at most 128 characters long');
}

export {
    ValidationError,
    validateUsername,
    validatePassword
};
