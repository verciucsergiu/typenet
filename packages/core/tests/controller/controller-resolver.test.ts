import { Controller, ActionResult, Ok, HttpGet, HttpPost, Created, FromRoute } from "../../src";
import { AppContainer } from "../../src/app-container/app-container";
import { expect } from 'chai';
import { DecoratorHandler } from "../../src/decorators/decorators-handler";

describe('Controller resolver', () => {
    const label = 'find action to exectute';
    // console.time(label);

    @Controller('api/test')
    class TestController {

        @HttpGet('')
        get(): ActionResult {
            return new Ok();
        }

        
        @HttpGet('{id}')
        getById(@FromRoute('{id}') id: string): ActionResult {
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

    DecoratorHandler.handle();

    it('Should find get method from TestController', () => {
        const action = AppContainer.getAction('api/test', 'GET', null);
        expect((<any>action).controller.controllerName).to.be.equal(TestController.name);
        expect((<any>action).method.name).to.be.equal("get");
        // console.timeEnd(label);
    });


    it('Should find getById method from TestController', () => {
        const action = AppContainer.getAction('api/test/1', 'GET', null);
        expect((<any>action).controller.controllerName).to.be.equal(TestController.name);
        expect((<any>action).method.name).to.be.equal("getById");
        // console.timeEnd(label);
    });
    
});