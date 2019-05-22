import { ServerSettings } from "./server-settings";
export class ApplicationSettings implements ServerSettings {
    [key: string]: any;
    public maxRequestSize: number = this['maxRequestSize'];
    public port: number = this['port'];
    constructor(settings: any) {
        for (const setting in settings) {
            this[setting] = settings[setting];
        }
    }
    public get(key: string): any {
        return this[key];
    }
    public static defaultSettings(): ApplicationSettings {
        return new ApplicationSettings({
            maxRequestSize: 1e6,
            port: 3000
        });
    }
}
