import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class Unauthorized extends Response implements IActionResult {
    public statusCode: number = 401;
}