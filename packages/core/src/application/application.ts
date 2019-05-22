import { ClassDefinitionTyped } from './types/class-definition';
import { CorsBuilder } from './cors/cors-options';

export interface Application {
    useSettings<T extends Object>(settings: T): void;
    useCorsPolicy(fnBuilder: (corsBuilder: CorsBuilder) => CorsBuilder): void;
    get<T>(injectable: ClassDefinitionTyped<T>): T;
    onRun(handler: () => void): void;
    run(): Promise<void>;
}