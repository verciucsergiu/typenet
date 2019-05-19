import { ClassDefinition } from './types/class-definition';
import { ModuleMetadata } from './types/module.metadata';
import { METADATA } from '../metadata/metadata.constants';
import { Controller } from '../controller';
import { Injectable } from '../injector';

export function Module(moduleMetadata: ModuleMetadata) {
    return (target: ClassDefinition) => {
        const validateClass = (classDefinition: ClassDefinition, metadataKey: string, decorator: string) => {
            const metadataValue = Reflect.getMetadata(metadataKey, classDefinition);
            if (!metadataValue) {
                throw new Error(`Invalid configuration for module '${target.name}'. ${classDefinition.name} is not decorated with '${decorator}'`)
            }
        }
        const validateKey = (key: ClassDefinition[], metadataKey: string, decorator: string) => {
            if (key) {
                key.forEach(x => validateClass(x, metadataKey, decorator));
            }
        };

        validateKey(moduleMetadata.controllers, METADATA.CONTROLLER, `@${Controller.name}()`);
        validateKey(moduleMetadata.providers, METADATA.INJECTABLE, `@${Injectable.name}()`);

        Reflect.defineMetadata(METADATA.MODULE, true, target);
    };
}
