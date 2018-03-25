import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class Ok extends Response implements IActionResult {
    public statusCode: number = 200;
}