import { DependencyContainer } from '../dependency-container';
import { ClassDefinition } from '../../application/types/class-definition';
import { InstanceType } from '../instance-type';

export function Injectable(instanceType: InstanceType= 'scopedInstance') {
    return (target: ClassDefinition) => {
        DependencyContainer.registerService(target, instanceType);
    };
}