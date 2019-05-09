export class UrlHelper {
    public static parse(url: string): string[] {
        const parsedUrl = url.split('/');

        if (parsedUrl.indexOf("") !== -1) {
            throw new Error(`Invalid route : ${url}`);
        }

        return parsedUrl;
    }

    public static isParameter(urlSegment: string): boolean {
        return urlSegment.startsWith(':');
    }
}