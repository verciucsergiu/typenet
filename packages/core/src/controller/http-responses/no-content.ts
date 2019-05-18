import { Response } from './response';

export class NoContent extends Response {
    public statusCode: number = 204;
}