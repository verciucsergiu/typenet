import { AppContainer } from '../app-container/app-container';
import { AppDecorator } from './models/app.decorator.model';

export function WebApi(metadata: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = metadata.settings;
    };
}