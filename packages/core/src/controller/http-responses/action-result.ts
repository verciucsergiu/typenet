import { Observable } from "rxjs";

export interface ActionResult {
    message?: any;
    statusCode: number;
}

export type ControllerMethodReturnType = ActionResult | Promise<ActionResult> | Observable<ActionResult>;