import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class BadRequest extends Response implements IActionResult {
    public statusCode: number = 400;
}