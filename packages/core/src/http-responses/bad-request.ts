import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class BadRequest extends Response implements ActionResult {
    public statusCode: number = 400;
}