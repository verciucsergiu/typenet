import { IncomingMessage } from "http";
import { PayloadTooLargeException } from "../server-exceptions/payload-too-large.exception";
import { Observable, Subject } from 'rxjs';

export class RequestBodyProvider {
    private bodySubject: Subject<any> = new Subject<any>();

    public getBodyAsJson(request: IncomingMessage, maxRequestSize: number): Observable<any> {
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
                this.bodySubject.next(JSON.parse(jsonString));
            } else {
                this.bodySubject.next(null);
            }
        });

        return this.bodySubject.asObservable();
    }
}