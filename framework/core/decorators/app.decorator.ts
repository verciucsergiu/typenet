import { AppContainer } from '../app-container/app-container';
import { AppDecorator } from './models/app.decorator.model';

export function App(settings: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = settings.settings;
    };
}