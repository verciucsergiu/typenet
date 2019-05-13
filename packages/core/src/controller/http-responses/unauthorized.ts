import { Response } from './response';

export class Unauthorized extends Response {
    public statusCode: number = 401;
}