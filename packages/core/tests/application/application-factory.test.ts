import 'mocha';
import { expect } from 'chai';
import { ApplicationFactory, Module, Injectable, ApplicationSettings, CorsOptions } from '../../src';
import { ApplicationContainer } from '../../src/application/application-container';
import { CorsMiddleware } from '../../src/application/cors/cors.middleware';
import { DependencyContainer } from '../../src/injector/dependency-container';

describe('Application factory', () => {
    @Injectable()
    class MyService { }

    @Module({
        providers: [
            MyService
        ]
    })
    class MyModule { }

    it('Should throw exception if a module that is not decorated is provided', () => {
        class NoModule { }

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
        const settings = app.get(ApplicationSettings);

        expect(settings.maxRequestSize).to.be.equal(30);
    });

    it('Should get key return key from settings', () => {
        const app = ApplicationFactory.create(MyModule);
        const mySettings = { mySettings: 123 };

        app.useSettings(mySettings);
        const settings = app.get(ApplicationSettings);

        expect(settings.get('mySettings')).to.be.equal(123);
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
            class NonInjectable { }

            @Module({ providers: [NonInjectable] })
            class InvalidModule { }
        };

        expect(action).to.throw();
    });

    it('Should start a server when run is called', async () => {
        const app = ApplicationFactory.create(MyModule);
        // find a way to test this!
        // try chai request
        // await app.run();
    });

    it('Should execute all handlers for run before starting a server', () => {
        let executed = false;
        const app = ApplicationFactory.create(MyModule);
        app.onRun(() => {
            executed = true;
        });

        app.run();

        expect(executed).to.be.true;
        app['server'].close();
    });

    it('Should be able to declare a cors policy and register cors middleware as middleware', () => {
        const app = ApplicationFactory.create(MyModule);
        const expectedMiddlewares = [CorsMiddleware];

        app.useCorsPolicy((builder) => builder.allowAnyHeaders().allowAnyMethods().allowAnyOrigins());
        app.run();

        const middleware = ApplicationContainer.getMiddlewares();
        const options = DependencyContainer.resolve(CorsOptions);

        expect(middleware).to.be.deep.equal(expectedMiddlewares);
        expect(options).to.not.be.undefined;

        app['server'].close();
    });
});
