import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class InternalServerError extends Response implements IActionResult {
    public statusCode: number = 500;
    public message: any = 'Internal server error!';
}