import { ActionResult, ResponseMessageType } from "./action-result";

export abstract class Response implements ActionResult {
    constructor(public message?: ResponseMessageType) {
    }

    public abstract get statusCode(): number;
}