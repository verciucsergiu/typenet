import { ControllerContainerModel, ActionContainer, Action, ActionParameter } from './models';
import { AppParams } from '../decorators/models';
import { UrlParser } from './helpers';
import { NotFoundException } from '../handlers/server-exceptions';

export class AppContainer {
    public static settings: AppParams;

    public static addController(controller: ControllerContainerModel): void {
        this.controllers.push(controller);
    }

    public static addVerbToController(verb: string, route: string, method: any, propKey: string): void {
        const ctrl: ControllerContainerModel =
            this.controllers
                .find((controller: ControllerContainerModel) => controller.controllerName === method.constructor.name);

        ctrl.addMethod(new ActionContainer(route, verb, method, propKey));
    }

    public static addPropertyToMethod(controllerName: string, methodName: string, parameter: ActionParameter): void {
        const ctrl: ControllerContainerModel =
            this.controllers.
                find((controller: ControllerContainerModel) => controller.controllerName === controllerName);

        const method = ctrl.getMethodByName(methodName);
        method.addActionParameter(parameter);
    }

    public static getAction(requestUrl: string, verb: string, requestBody: any): Action {
        const parsedUrl: Array<string> = UrlParser.parse(requestUrl);
        let ctrl: ControllerContainerModel;
        const find: boolean = false;
        let currentIndex: number = 0;
        let currentUrl: string = parsedUrl[currentIndex++];
        let method: ActionContainer;
        while (currentIndex <= parsedUrl.length) {
            ctrl = this.getController(currentUrl);
            if (ctrl) {
                const remaingUrl: Array<string> = new Array<string>();
                for (let index = currentIndex; index < parsedUrl.length; index++) {
                    remaingUrl.push(parsedUrl[index]);
                }
                method = ctrl.getMethod(remaingUrl, verb);
                if (method) {
                    const params: Array<any> = method.getActionParams(remaingUrl, requestBody);
                    return new Action(method.method[method.propKey], params);
                } else {
                    currentUrl = currentUrl + '/' + parsedUrl[currentIndex++];
                }
            } else {
                currentUrl = currentUrl + '/' + parsedUrl[currentIndex++];
            }
        }

        throw new NotFoundException('Method not found!');
    }

    private static controllers: Array<ControllerContainerModel> = new Array<ControllerContainerModel>();

    private static getController(route: string): ControllerContainerModel {
        const ctrl: ControllerContainerModel =
            this.controllers.find((controller: ControllerContainerModel) => controller.path === route);
        if (ctrl) {
            return ctrl;
        }
    }

}