import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class NotFound extends Response implements ActionResult {
    public statusCode: number = 404;
    public message: any = 'Not found!';
}