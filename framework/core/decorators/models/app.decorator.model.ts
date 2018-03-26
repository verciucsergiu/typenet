import { AppParams } from './app-params.model';

export class AppDecorator {
    public controllers?: Array<Function>;
    public settings?: AppParams;

    constructor() {
    }
}