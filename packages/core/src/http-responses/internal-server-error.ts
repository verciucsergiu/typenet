import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class InternalServerError extends Response implements ActionResult {
    public statusCode: number = 500;
    public message: any = 'Internal server error!';
}