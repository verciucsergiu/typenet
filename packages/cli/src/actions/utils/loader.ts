import { Ora } from 'ora';
import ora = require('ora');

export class Loader {
    private spinner: Ora;
    constructor() {
        this.spinner = ora({ hideCursor: true, spinner: 'dots2', color: 'cyan' });
    }

    public start(text: string): void {
        this.spinner.start(text);
    }

    public succeed(text?: string): void {
        this.spinner.succeed(text);
    }

    public fail(text?: string): void {
        this.spinner.fail(text);
    }

    public stop(): void {
        this.spinner.stop();
    }
}