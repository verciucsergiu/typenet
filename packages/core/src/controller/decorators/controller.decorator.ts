import { ApplicationContainer } from "../../application/application-container";
import { ClassDefinition } from "../../application/types/class-definition";
import { Route } from "../../routing/route";
import { METADATA } from "../../metadata/metadata.constants";

export function Controller(route: string) {
    return (target: ClassDefinition) => {
        if (route) {
            Reflect.defineMetadata(METADATA.CONTROLLER, true, target);
            ApplicationContainer.addController(Route.create(route), target);
        } else {
            throw new Error(`Invalid route for controller: ${target.constructor.name}`);
        }
    };
}