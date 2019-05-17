import { Observable } from "rxjs";
 
export interface ActionResult {
    message?: ResponseMessageType;
    statusCode: number;
}

export type ResponseMessageType = string | number | Object | Promise<Object> | Observable<Object>; 

export type ControllerMethodReturnType = ActionResult;