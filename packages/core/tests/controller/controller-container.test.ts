import { ControllersContainer } from "../../src/controller/controllers-container";
import { expect } from 'chai';
import { Route } from "../../src/app-container/route";

describe('Controller container', () => {

    class CategoryContoller {
    }

    class SubcategoryController {
    }

    describe('addController', () => {
        it('Should create a route tree for each controller class', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category/subcategory/thirdcategory'), CategoryContoller);
            const correspondingRouteTree = container['routesTree']['api']['category']['subcategory']['thirdcategory'];
            expect(correspondingRouteTree).to.not.be.undefined;
            expect(correspondingRouteTree.__controllerType__).to.be.equal(CategoryContoller);
        });

        it('Route tree should contain __controllerType__ on corresponding level of depth', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/subcategory/thirdcategory'), SubcategoryController);
            const firstDepth = container['routesTree']['api']['category'];
            const secondDepth = container['routesTree']['api']['category']['subcategory']['thirdcategory'];
            expect(firstDepth.__controllerType__).to.be.equal(CategoryContoller);
            expect(secondDepth.__controllerType__).to.be.equal(SubcategoryController);
        });


        it('should create paremeter tree when a route has a parameter', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/:categoryId/subcategory'), SubcategoryController);

            const firstDepth = container['routesTree']['api']['category'];
            const secondDepth = firstDepth.__parameterTree__['subcategory'];
            expect(firstDepth.__controllerType__).to.be.equal(CategoryContoller);
            expect(secondDepth.__controllerType__).to.be.equal(SubcategoryController);
        });
    });

    describe('resolveControllers', () => {

        it('should resolve all potentials & relevant controllers types', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/subcategory/thirdcategory'), SubcategoryController);

            const controllers = container['resolveControllers'](Route.create('api/category'));

            expect(controllers).to.be.deep.equal([{ controller: CategoryContoller, remainingRoute: Route.empty() }]);
        });

        it('should resolve all potentials & relevant controllers types for deeper routes', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/subcategory/thirdcategory'), SubcategoryController);

            const controllers = container['resolveControllers'](Route.create('api/category/subcategory/thirdcategory/some-guid'));

            expect(controllers).to.be.deep.equal([{ controller: CategoryContoller, remainingRoute: Route.create('subcategory/thirdcategory/some-guid') }, { controller: SubcategoryController, remainingRoute: Route.create('some-guid') }]);
        });

        it('should exclude unrelevant controllers for inbetween routes', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/subcategory/thirdcategory'), SubcategoryController);

            const controllers = container['resolveControllers'](Route.create('api/category/some-guid'));

            expect(controllers).to.be.deep.equal([{ controller: CategoryContoller, remainingRoute: Route.create('some-guid') }]);
        });

        it('should be abel to resolve including parameter routes', () => {
            const container = new ControllersContainer();
            container.addController(Route.create('api/category'), CategoryContoller);
            container.addController(Route.create('api/category/:categoryId/subcategory/thirdcategory'), SubcategoryController);

            const controllers = container['resolveControllers'](Route.create('api/category/8f93192d-6b7c-43e5-bb6c-51d1974dc5a6/subcategory/thirdcategory'));

            expect(controllers).to.be.deep.equal([{ controller: CategoryContoller, remainingRoute: Route.create('8f93192d-6b7c-43e5-bb6c-51d1974dc5a6/subcategory/thirdcategory') }, { controller: SubcategoryController, remainingRoute: Route.empty() }]);
        });
    });

});