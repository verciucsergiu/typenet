import { Module } from "@typenet/core";
import { DummyController } from "./controllers/dummy.controller";

@Module({
    controllers: [
        DummyController
    ]
})
export class AppModule { }