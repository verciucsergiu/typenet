export class UrlParser {
    public static parse(url: string): string[] {
        return url.split('/');
    }
}