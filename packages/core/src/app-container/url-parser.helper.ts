export class UrlParser {
    public static parse(url: string): string[] {
        const parsedUrl = url.split('/');
        
        if (parsedUrl.indexOf("") !== -1) {
            throw new Error('Invalid route');
        }

        return parsedUrl;
    }
}