import { ClassDefinition } from '@typenet/core/lib/application/types/class-definition';
import { METADATA } from '@typenet/core/lib/metadata/metadata.constants';
import { DependencyContainer } from '@typenet/core/lib/injector/dependency-container';
import { webSocketMetadata } from './constants';
import { WebSocketContainer } from '../websocket.container';

export function WebSocketHub() {
    return (target: ClassDefinition) => {
        Reflect.defineMetadata(METADATA.INJECTABLE, true, target);
        DependencyContainer.registerService(target, 'singleInstance');
        Reflect.defineMetadata(webSocketMetadata.hub, true, target);
        WebSocketContainer.addHub(target);
    };
}