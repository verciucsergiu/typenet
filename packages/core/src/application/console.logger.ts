import { Logger } from "./logger";
import { Injectable } from "../injector";

@Injectable('singleInstance')
export class ConsoleLogger implements Logger {
    public log(message: string): void {
        console.log(message);
    }
}