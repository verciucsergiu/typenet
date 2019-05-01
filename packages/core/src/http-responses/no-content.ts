import { Response } from './response';
import { IActionResult } from './action-result.interface';

export class NoContent extends Response implements IActionResult {
    public statusCode: number = 204;
}