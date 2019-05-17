import { IncomingMessage } from "http";
import { PayloadTooLargeException } from "../server-exceptions/payload-too-large.exception";
import { Injectable } from "../injector";

@Injectable()
export class RequestBodyProvider {

    public getBodyAsJson<T>(request: IncomingMessage, maxRequestSize: number): Promise<T> {
        return new Promise((resolve) => {
            let jsonString: string = '';
            request.on('data', (data) => {
                jsonString += data;
                if (jsonString.length > maxRequestSize) {
                    jsonString = '';
                    throw new PayloadTooLargeException(
                        `Request size is larger than ${maxRequestSize} ` +
                        `${request.url} -> ${request.method}!`);
                }
            });
    
            request.on('end', () => {
                if (jsonString !== '') {
                    resolve(JSON.parse(jsonString));
                } else {
                    resolve(null);
                }
            });
        });
    }
}