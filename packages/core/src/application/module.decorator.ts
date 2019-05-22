import { ClassDefinition } from './types/class-definition';
import { ModuleMetadata } from './types/module.metadata';
import { METADATA } from '../metadata/metadata.constants';
import { Controller } from '../controller';
import { Injectable } from '../injector';

export function Module(moduleMetadata: ModuleMetadata) {
    return (target: ClassDefinition) => {
        const validateClass = (classDefinition: ClassDefinition, expected: string, metadataKeys: string[]) => {
            let isInvalid: boolean = true;
            metadataKeys.forEach((metadataKey) => {
                const metadataValue = Reflect.getMetadata(metadataKey, classDefinition);
                if (metadataValue) {
                    isInvalid = false;
                }
            });

            if (isInvalid) {
                throw new Error(`Invalid configuration for module '${target.name}'. ${classDefinition.name} is not a/an '${expected}'`);
            }
        };
        const validateKey = (key: ClassDefinition[], expected: string, ...metadataKeys: string[]) => {
            if (key) {
                key.forEach((x) => validateClass(x, expected, metadataKeys));
            }
        };

        validateKey(moduleMetadata.controllers, `@${Controller.name}`, METADATA.CONTROLLER);
        validateKey(moduleMetadata.providers, `@${Injectable.name}`, METADATA.INJECTABLE, METADATA.MIDDLEWARE);
        validateKey(moduleMetadata.imports, `@${Module.name}`, METADATA.MODULE);

        Reflect.defineMetadata(METADATA.MODULE, true, target);
    };
}
