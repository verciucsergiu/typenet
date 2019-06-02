import { ApplicationFactory } from "@typenet/core";
import { WsModule } from '@typenet/web-socket';
import { AppModule } from './src/app-module';
import * as settings from './settings.json';

async function bootstrap() {
    const app = ApplicationFactory.create(AppModule);
    app.useSettings(settings);
    WsModule.registerWebSockets(app);
    await app.run();
}

bootstrap();