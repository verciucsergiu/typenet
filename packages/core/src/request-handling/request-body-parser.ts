import { IncomingMessage } from "http";
import { PayloadTooLargeException } from "../server-exceptions/payload-too-large.exception";
import { Injectable } from "../injector";
import { ApplicationSettings } from "../application";

@Injectable()
export class RequestBodyProvider {

    constructor(private readonly settings: ApplicationSettings) {}

    public getBodyAsJson<T>(request: IncomingMessage): Promise<T> {
        return new Promise((resolve) => {
            let jsonString: string = '';
            request.on('data', (data) => {
                jsonString += data;
                if (jsonString.length > this.settings.maxRequestSize) {
                    jsonString = '';
                    throw new PayloadTooLargeException(
                        `Request size is larger than ${this.settings.maxRequestSize} ` +
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