import { IActionResult } from './action-result.interface';
import { Response } from './response';

export class Created extends Response implements IActionResult {
    public statusCode: number = 200;
}