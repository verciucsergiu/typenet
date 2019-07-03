import { Module } from "@typenet/core";
import { ChatHub } from "./chat-hub/chat.hub";

@Module({
    providers: [ChatHub]
})
export class AppModule { }