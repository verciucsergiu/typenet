import 'reflect-metadata';
import { ClassDefinition, ClassDefinitionTyped } from '../application/types/class-definition';
import { Tree } from '../routing/tree';
import { InjectableNotFound } from './errors/injecatble-not-found';
import { InstanceType } from './instance-type';

interface DependencyMetadata {
    constructorMetadata: ClassDefinition[];
    instanceType: InstanceType;
}

export class DependencyContainer {

    public static readonly dependencyMetadata: Tree<DependencyMetadata> = {};
    public static singleInstances: Tree<Object> = {};
    public static scopedInstances: Tree<Object> = {};

    public static registerService(service: ClassDefinition, instanctType: InstanceType = 'scopedInstance', instance?: Object): void {
        this.dependencyMetadata[service.name] = { instanceType: instanctType, constructorMetadata: Reflect.getMetadata('design:paramtypes', service) };
    }

    public static createScope(): void {
        this.scopedInstances = {};
    }

    public static resolve<T>(classToInstantiate: ClassDefinitionTyped<T>): T {
        const dependencyMetadata = this.dependencyMetadata[classToInstantiate.name];
        if (!dependencyMetadata) {
            throw new InjectableNotFound(classToInstantiate);
        }

        if (dependencyMetadata.instanceType === 'singleInstance') {
            if (this.singleInstances[classToInstantiate.name]) {
                return this.singleInstances[classToInstantiate.name] as T;
            } else {
                return this.createAndResolve(classToInstantiate, this.singleInstances);
            }

        } else if (dependencyMetadata.instanceType === 'scopedInstance') {
            if (this.scopedInstances[classToInstantiate.name]) {
                return this.scopedInstances[classToInstantiate.name] as T;
            } else {
                return this.createAndResolve(classToInstantiate, this.scopedInstances);
            }
        } else if (dependencyMetadata.instanceType === 'transientInstance') {
            return this.createAndResolve(classToInstantiate);
        }
    }

    private static createAndResolve<T>(classToInstantiate: ClassDefinitionTyped<T>, instancesHolder?: Tree<Object>): T {
        const dependencyMetadata = this.dependencyMetadata[classToInstantiate.name];
        if (dependencyMetadata.constructorMetadata && dependencyMetadata.constructorMetadata.length > 0) {
            const params: Object[] = [];

            for (const arg of dependencyMetadata.constructorMetadata) {
                params.push(this.resolve(arg));
            }

            const instance = new classToInstantiate.prototype.constructor(...params);
            if (instancesHolder) {
                instancesHolder[classToInstantiate.name] = instance;
            }
            return instance;

        } else {
            const instance = new classToInstantiate.prototype.constructor();
            if (instancesHolder) {
                instancesHolder[classToInstantiate.name] = instance;
            }
            return instance;
        }
    }
}