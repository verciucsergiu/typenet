import { ControllerContainerModel } from './types/controller-container.model';
import { ActionContainer } from './types/action-container.model';
import { ActionParameter } from './types/action-parameter.model';
import { UrlParser } from './url-parser.helper';
import { Action } from './types/action';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { AppParams } from '../decorators/models/app-params.model';

export class AppContainer {

    /**
     * App settings.
     */
    public static settings: AppParams;

    /**
     * All controlles declared into the @WebApi decorator and are decorated with @Controller as well.
     * This list is used when parsing a new request uri.
     */
    private static controllers: Array<ControllerContainerModel> = [];

    /**
     * Pushes the given model into the controllers array.
     * @param controller a new ControllerContainerModel that will be added to the controllers list
     */
    public static addController(controller: ControllerContainerModel): void {
        this.controllers.push(controller);
    }

    /**
     * Adds a new ActionContainer to the controller methods list.
     * @param verb GET, POST, PUT, PATCH, DELETE
     * @param route string that represents the path to that metod
     * @param method function that is called when a request is made to the route
     * @param propKey that function name name
     */
    public static addVerbToController(verb: string, route: string, method: any, propKey: string): void {
        const ctrl: ControllerContainerModel =
            this.controllers
                .find((controller: ControllerContainerModel) => controller.controllerName === method.constructor.name);

        ctrl.addAction(new ActionContainer(route, verb, method, propKey));
    }

    public static addMetadataToControllerMethod(controllerName: string, methodName: string, parameter: ActionParameter): void {
        const ctrl: ControllerContainerModel =
            this.controllers.find((c: ControllerContainerModel) => c.controllerName === controllerName);

        const method = ctrl.getActionByName(methodName);
        method.addActionParameter(parameter);
    }

    public static getAction(requestUrl: string, verb: string, requestBody: any): Action {
        const parsedUrl: Array<string> = UrlParser.parse(requestUrl);

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