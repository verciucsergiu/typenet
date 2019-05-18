import { Response } from './response';

export class PayloadTooLarge extends Response {
    public statusCode: number = 413;
}