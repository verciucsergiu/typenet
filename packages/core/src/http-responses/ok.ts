import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class Ok extends Response implements ActionResult {
    public statusCode: number = 200;
}