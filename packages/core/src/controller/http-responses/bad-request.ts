import { ActionResult } from './action-result';
import { Response } from './response';

export class BadRequest extends Response {
    public statusCode: number = 400;
}