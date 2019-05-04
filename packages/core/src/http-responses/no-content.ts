import { Response } from './response';
import { ActionResult } from './action-result.interface';

export class NoContent extends Response implements ActionResult {
    public statusCode: number = 204;
}