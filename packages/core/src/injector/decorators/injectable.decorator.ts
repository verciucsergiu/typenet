import { DependencyContainer } from '../dependency-container';
import { ClassDefinition } from '../../application/types/class-definition';
import { InstanceType } from '../instance-type';
import { METADATA } from '../../metadata/metadata.constants';

export function Injectable(instanceType: InstanceType= 'scopedInstance') {
    return (target: ClassDefinition) => {
        Reflect.defineMetadata(METADATA.INJECTABLE, true, target);
        DependencyContainer.registerService(target, instanceType);
    };
}