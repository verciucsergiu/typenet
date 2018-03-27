import { StudentsController } from './01-controllers';
import { App } from '@typenet/core';

@App({
    controllers: [
        StudentsController
    ],
    settings: {
        port: 4200,
        maxRequestSize: 1e6
    }
})
export class Startup {}
