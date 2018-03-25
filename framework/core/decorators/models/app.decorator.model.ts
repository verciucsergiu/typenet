import { AppParams } from './app-params.model';

export class AppDecorator {
    public controllers?: Array<any>;
    public settings?: AppParams;

    constructor() {
    }
}