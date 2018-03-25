import { AppDecorator} from './models';
import { AppContainer } from '../containers';

export function App(settings: AppDecorator) {
    return (target: any) => {
        AppContainer.settings = settings.settings;
    };
}