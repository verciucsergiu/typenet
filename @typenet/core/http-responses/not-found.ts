import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class NotFound extends Response implements IActionResult {
    public statusCode: number = 404;
    public message: any = 'Not found!';
}