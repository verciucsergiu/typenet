import { AppContainer } from '../app-container/app-container';
import { AppDecorator } from './models/app.decorator.model';

export function WebApi(settings: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = settings.settings;
    };
}