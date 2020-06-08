// Custom error class whenever an API gives us an error status code
export class ResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ResponseError';
    }
}
