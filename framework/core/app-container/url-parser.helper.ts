export class UrlParser {
    public static parse(url: string): Array<string> {
        return url.split('/');
    }
}