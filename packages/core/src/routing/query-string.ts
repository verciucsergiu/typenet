export class QueryString {

    constructor(private readonly query: string) {
    }

    public toObject(): Object {
        const segments = this.query.split('&');
        const queryAsObject = {};
        for (const segment of segments) {
            const segmentSplitted = segment.split('=');
            queryAsObject[decodeURIComponent(segmentSplitted[0])] = decodeURIComponent(segmentSplitted[1]);
        }

        return queryAsObject;
    }
}