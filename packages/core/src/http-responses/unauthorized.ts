import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class Unauthorized extends Response implements ActionResult {
    public statusCode: number = 401;
}