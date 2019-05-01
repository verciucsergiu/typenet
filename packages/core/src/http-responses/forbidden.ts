import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class Forbidden extends Response implements IActionResult {
    public statusCode: number = 403;
}