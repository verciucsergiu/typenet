import * as settings from '../settings.json';
import { ApplicationFactory } from "@typenet/core";

async function bootstrap() {
    const app = ApplicationFactory.create();
    app.useSettings(settings);
    await app.run();
}

bootstrap();