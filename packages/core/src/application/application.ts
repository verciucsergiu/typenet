import { ClassDefinitionTyped } from './types/class-definition';
import { CorsBuilder } from './cors/cors-options';
import { Server } from 'http';

export interface Application {
    useSettings<T extends Object>(settings: T): this;
    useCorsPolicy(fnBuilder: (corsBuilder: CorsBuilder) => CorsBuilder): this;
    get<T>(injectable: ClassDefinitionTyped<T>): T;
    onRun(handler: (server: Server) => void): this;
    run(): Promise<void>;
}