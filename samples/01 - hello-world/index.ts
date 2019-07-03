import { ApplicationFactory } from "@typenet/core";
import { AppModule } from './src/app-module';
import * as settings from './settings.json';

async function bootstrap() {
    const app = ApplicationFactory.create(AppModule);
    app.useSettings(settings);
    await app.run();
}

bootstrap();