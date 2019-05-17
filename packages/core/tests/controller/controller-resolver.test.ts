import { HttpGet, HttpPost, Controller, ActionResult, FromRoute, Ok, Created } from "../../src/controller";
import { AppContainer } from "../../src/app-container/app-container";
import { expect } from 'chai';

describe('Controller resolver', () => {
    const label = 'find action to exectute';

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
        console.time(label + 3);
        const action = AppContainer.getActionCommand('GET', 'api/test/1', null);
        console.timeEnd(label + 3);
        expect((<any>action).controllerFunction.name).to.be.equal(TestController.name);
        expect((<any>action).methodName).to.be.equal("getById");
    });

    it('Should find get method from TestController but faster', () => {
        console.time(label + 4);
        const action = AppContainer.getActionCommand('GET', 'api/test', null);
        console.timeEnd(label + 4);
        expect((<any>action).controllerFunction.name).to.be.equal(TestController.name);
        expect((<any>action).methodName).to.be.equal("get");
    });
});