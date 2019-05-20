import { HttpGet, HttpPost, Controller, ActionResult, FromRoute, Ok, Created } from "../../src/controller";
import { ApplicationContainer } from "../../src/application/application-container";
import { expect } from 'chai';
import { Route } from "../../src/routing/route";

describe('Controller resolver', () => {

    @Controller('api/test')
    class TestController {

        @HttpGet('')
        public get(): ActionResult {
            return new Ok();
        }

        @HttpPost(':id')
        public getById(@FromRoute(':id') id: string): ActionResult {
            return new Ok(id);
        }
    }

    @Controller('api/test/:id')
    class SubTestController {
        @HttpGet('')
        public get(): ActionResult {
            return new Ok();
        }

        @HttpGet(':subTestId')
        public getById(@FromRoute(':id') id: string): ActionResult {
            return new Ok(id);
        }
    }

    @Controller('api/resources')
    class ResourcesController {
        @HttpPost('')
        public create(): ActionResult {
            return new Created();
        }
    }

    it('Should find getById method from TestController', () => {
        const action = ApplicationContainer.getActionCommand('POST', Route.create('api/test/1'));
        expect((action as any).controllerFunction.name).to.be.equal(TestController.name);
        expect((action as any).methodName).to.be.equal("getById");
    });

    it('Should find get method from TestController', () => {
        const action = ApplicationContainer.getActionCommand('GET', Route.create('api/test'));
        expect((action as any).controllerFunction.name).to.be.equal(TestController.name);
        expect((action as any).methodName).to.be.equal("get");
    });

    it('Should create parameter route accordingly', () => {
        const expectedRouteParameters = { ':id': 2, ':subtestid': 3 };

        const action = ApplicationContainer.getActionCommand('GET', Route.create('api/test/20/30'));
        expect((action as any).controllerFunction.name).to.be.equal(SubTestController.name);
        expect((action as any).methodName).to.be.equal("getById");
        expect((action as any).routeParameters).to.include(expectedRouteParameters);
    });
});