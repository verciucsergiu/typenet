import { ActionResult } from "./action-result";

export abstract class Response implements ActionResult {
    constructor(public message?: any) {
    }

    public abstract get statusCode(): number;
}