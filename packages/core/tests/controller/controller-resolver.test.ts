import { HttpGet, HttpPost, Controller, ActionResult, FromRoute, Ok, Created } from "../../src/controller";
import { AppContainer } from "../../src/app-container/app-container";
import { expect } from 'chai';
import { Route } from "../../src/app-container/route";

describe('Controller resolver', () => {

    @Controller('api/test')
    class TestController {

        @HttpGet('')
        get(): ActionResult {
            return new Ok();
        }

        @HttpGet(':id')
        getById(@FromRoute(':id') id: string): ActionResult {
            return new Ok(id);
        }
    }

    @Controller('api/resources')
    class ResourcesController {
        @HttpPost('')
        create(): ActionResult {
            return new Created();
        }
    }

    it('Should find getById method from TestController but faster', () => {
        const action = AppContainer.getActionCommand('GET', Route.create('api/test/1'));
        expect((<any>action).controllerFunction.name).to.be.equal(TestController.name);
        expect((<any>action).methodName).to.be.equal("getById");
    });

    it('Should find get method from TestController but faster', () => {
        const action = AppContainer.getActionCommand('GET', Route.create('api/test'));
        expect((<any>action).controllerFunction.name).to.be.equal(TestController.name);
        expect((<any>action).methodName).to.be.equal("get");
    });
});