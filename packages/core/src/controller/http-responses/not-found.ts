import { Response } from './response';

export class NotFound extends Response {
    public statusCode: number = 404;
    public message: any = 'Not found!';
}