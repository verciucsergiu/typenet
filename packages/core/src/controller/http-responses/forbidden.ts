import { Response } from './response';

export class Forbidden extends Response {
    public statusCode: number = 403;
}