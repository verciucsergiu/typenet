import { Response } from './response';

export class NoContent extends Response {
    constructor() {
        super();
    }
    public statusCode: number = 204;
}