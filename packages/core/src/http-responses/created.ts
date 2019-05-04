import { ActionResult } from './action-result.interface';
import { Response } from './response';

export class Created extends Response implements ActionResult {
    public statusCode: number = 201;
}