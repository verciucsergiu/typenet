import { ServerResponse } from "http";
import { ActionResult } from "../controller";

export interface ResponseHandler {
    handle(response: ActionResult, serverResponse: ServerResponse): void;
}