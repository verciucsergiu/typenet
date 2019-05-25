import { ClassDefinitionTyped } from './types/class-definition';
import { CorsBuilder } from './cors/cors-options';
import { Server } from 'http';

export interface Application {
    useSettings<T extends Object>(settings: T): void;
    useCorsPolicy(fnBuilder: (corsBuilder: CorsBuilder) => CorsBuilder): void;
    get<T>(injectable: ClassDefinitionTyped<T>): T;
    onRun(handler: (server: Server) => void): void;
    run(): Promise<void>;
}