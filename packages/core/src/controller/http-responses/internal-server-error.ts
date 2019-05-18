import { Response } from './response';

export class InternalServerError extends Response {
    public statusCode: number = 500;
    public message: any = 'Internal server error!';
}