import { Response } from './response';
import { IActionResult } from './action-result.interface';

export class PayloadTooLarge extends Response implements IActionResult {
    public statusCode: number = 413;
}