export abstract class Response {
    constructor(public message?: any) {
    }

    public abstract get statusCode(): number;
}