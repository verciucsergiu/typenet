import { ServerResponse, STATUS_CODES } from 'http';
import { IActionResult } from '../http-responses';

export class ResponseHandler {
    constructor(private response: ServerResponse) {
    }

    public handle(response: IActionResult | Promise<IActionResult>): void {
        if (this.isActionResult(response)) {
            this.sendResponse(response);
        } else {
            response.then((result: IActionResult) => {
                this.sendResponse(result);
            });
        }
    }

    private sendResponse(result: IActionResult): void {
        this.response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(result.message);
        } catch {
            responseMessage = '{ "message" : "' + result.message + '" }';
        }
        this.response.end(responseMessage);
        this.response.end();
    }

    private isActionResult(arg: any): arg is IActionResult {
        return arg.statusCode !== undefined;
    }
}