import { ActionParameter } from './action-parameter.model';
import { ParameterType } from './parameter.type';
import { UrlParser } from '../url-parser.helper';

export class ActionContainer {
    public routes: Array<string> = new Array<string>();
    public actionParams: Array<ActionParameter> = new Array<ActionParameter>();

    constructor(
        public route: string,
        public verb: string,
        public method: any,
        public propKey: string) {

        this.routes = UrlParser.parse(route);
    }

    public getActionParams(routes: Array<string>, requestBody: any): Array<any> {
        const paramsValues: Array<string> = this.getParamsFromRoute(routes);
        const params: Array<string> = new Array<string>();
        let currentParamIndex = 0;
        for (const actionParam of this.actionParams) {
            if (actionParam.type === ParameterType.FromRoute) {
                params[actionParam.paramIndex] = paramsValues[actionParam.parameterName];
            } else {
                params[currentParamIndex] = requestBody;
            }

            currentParamIndex++;
        }

        return params;
    }

    public addActionParameter(actionParameter: ActionParameter): void {
        this.actionParams.push(actionParameter);
    }

    public isCurrentRoute(routes: Array<string>, verb: string): boolean {
        // TODO: refactor this method! Doesnt work properly!

        let defaultRouteAdded: boolean = false;
        if (routes.length === 0) {
            routes.push('');
            defaultRouteAdded = true;
        }
        let atLeastOneParamWasChecked: boolean = false;
        for (let index = 0; index < this.routes.length; index++) {
            const currentRouteIndex: string = this.routes[index];
            if (currentRouteIndex[0] !== '{' && currentRouteIndex[currentRouteIndex.length - 1] !== '}') {
                atLeastOneParamWasChecked = true;
                if (routes[index] !== this.routes[index]) {
                    return false;
                }
            }
        }

        if (atLeastOneParamWasChecked) {
            if (this.verb !== verb) {
                return false;
            }

            return true;

        } else {
            if (this.routes.length === routes.length && this.verb === verb && !defaultRouteAdded) {
                return true;
            }
            return false;
        }

    }

    private getParamsFromRoute(routes: Array<string>): Array<string> {
        const params: Array<string> = new Array<string>();
        for (let index = 0; index < this.routes.length; index++) {
            const currentRouteIndex: string = this.routes[index];
            if (currentRouteIndex[0] === '{' && currentRouteIndex[currentRouteIndex.length - 1] === '}') {
                params[currentRouteIndex] = routes[index];
            }
        }

        return params;
    }

}