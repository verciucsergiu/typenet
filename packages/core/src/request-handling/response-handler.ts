import { ActionResult } from "../controller";
import { ResponseContext } from "../application";

export interface ResponseHandler {
    handle(response: ActionResult, responseContext: ResponseContext): void;
}