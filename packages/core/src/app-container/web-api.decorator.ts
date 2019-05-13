import { AppContainer } from './app-container';
import { AppDecorator } from '../controller/decorators/models/app.decorator.model';

export function WebApi(metadata: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = metadata.settings;
    };
}