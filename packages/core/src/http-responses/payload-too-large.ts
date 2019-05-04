import { Response } from './response';
import { ActionResult } from './action-result.interface';

export class PayloadTooLarge extends Response implements ActionResult {
    public statusCode: number = 413;
}