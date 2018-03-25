import { App, Core } from '../framework/core';
import { StudentsController } from './01-controllers';

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
