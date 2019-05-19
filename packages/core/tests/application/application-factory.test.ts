import 'mocha';
import { expect } from 'chai';
import { ApplicationFactory, Module, Injectable } from '../../src';

describe('Application factory', () => {

    class NoModule { }

    @Injectable()
    class MyService { }

    @Module({
        providers: [
            MyService
        ]
    })
    class MyModule { }

    it('Should throw exception if a module that is not decorated is provided', () => {
        const action = () => ApplicationFactory.create(NoModule);

        expect(action).to.throw();
    });

    it('Should create core application', () => {
        const application = ApplicationFactory.create(MyModule);

        expect(application).to.not.be.undefined;
    });

    it('Should override application settings', () => {
        const app = ApplicationFactory.create(MyModule);
        const setting = { maxRequestSize: 30 };

        app.useSettings(setting);

        expect(app['settings'].maxRequestSize).to.be.equal(30);
    });

    it('Should resolve application injectables', () => {
        const app = ApplicationFactory.create(MyModule);

        const result = app.get(MyService);

        expect(result).to.not.be.undefined;
    });

    it('Should throw exception when metadata for controller is provided by controller class is not decorated accordingly', () => {
        const action = () => {
            class ControllerClass { }

            @Module({ controllers: [ControllerClass] })
            class InvalidModule { }
        };

        expect(action).to.throw();
    });

    it('Should throw exception when metadata for provider is provided by injecatble class is not decorated accordingly', () => {
        const action = () => {
            class MyService { }

            @Module({ providers: [MyService] })
            class InvalidModule { }
        };

        expect(action).to.throw();
    });
});

