import { AppDecorator } from './models';
import { AppContainer } from '../containers';
import { DependencyContainer } from '../../injector';

export function App(settings: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = settings.settings;
    };
}