import { ControllerContainerModel } from './types/controller-container.model';
import { ActionContainer } from './types/action-container.model';
import { ActionParameter } from './types/action-parameter.model';
import { UrlHelper } from './url-parser.helper';
import { Action } from './types/action';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { AppParams } from '../decorators/models/app-params.model';
import { ControllersContainer } from '../controller/controllers-container';
import { HttpVerb } from '../controller/types';

export class AppContainer {
    public static controllersContainer = new ControllersContainer();

    public static settings: AppParams;

    private static controllers: ControllerContainerModel[] = [];

    public static addController(controller: ControllerContainerModel): void {
        this.controllersContainer.addController(controller.path, controller.controller);
        this.controllers.push(controller);
    }

    public static addMethod(verb: HttpVerb, route: string, method: any, methodName: string): void {
        this.controllersContainer.addMethodDescriptor(verb, route, method.constructor.name, methodName);
        const ctrl: ControllerContainerModel =
            this.controllers
                .find((controller: ControllerContainerModel) => controller.controllerName === method.constructor.name);

        ctrl.addAction(new ActionContainer(route, verb, method, methodName));
    }

    public static addMetadataToControllerMethod(controllerName: string, methodName: string, parameter: ActionParameter): void {
        const ctrl: ControllerContainerModel =
            this.controllers.find((c: ControllerContainerModel) => c.controllerName === controllerName);

        const method = ctrl.getActionByName(methodName);
        method.addActionParameter(parameter);
    }

    public static getAction(requestUrl: string, verb: string, requestBody: any): Action {
        const parsedUrl: Array<string> = UrlHelper.parse(requestUrl);

        let ctrl: ControllerContainerModel;
        let currentIndex: number = 0;
        let currentUrl: string = parsedUrl[currentIndex++];
        let method: ActionContainer;

        while (currentIndex <= parsedUrl.length) {
            ctrl = this.getController(currentUrl);

            if (ctrl) {
                const remaingUrl: Array<string> = [];
                for (let index = currentIndex; index < parsedUrl.length; index++) {
                    remaingUrl.push(parsedUrl[index]);
                }

                method = ctrl.getAction(remaingUrl, verb);
                if (method) {
                    const actionParams: Array<any> = method.getActionParams(remaingUrl, requestBody);
                    return new Action(ctrl, method.method[method.propKey], actionParams);
                } else {
                    currentUrl = currentUrl + '/' + parsedUrl[currentIndex++];
                }
            } else {
                currentUrl = currentUrl + '/' + parsedUrl[currentIndex++];
            }
        }

        throw new NotFoundException(`Action for the route "${requestUrl}" with method ${verb} was not found!`);
    }

    private static getController(route: string): ControllerContainerModel {
        const ctrl: ControllerContainerModel =
            this.controllers.find((controller: ControllerContainerModel) => controller.path === route);
        if (ctrl) {
            return ctrl;
        }

        return undefined;
    }

}