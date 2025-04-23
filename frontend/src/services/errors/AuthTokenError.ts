export class AuthTokenError extends Error {
    constructor() {
        super('Error with authentication method');
        this.name = 'AuthTokenError';
    }
}
