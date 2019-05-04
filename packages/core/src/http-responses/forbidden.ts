import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class Forbidden extends Response implements ActionResult {
    public statusCode: number = 403;
}