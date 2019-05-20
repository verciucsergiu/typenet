import { expect } from 'chai';
import 'reflect-metadata';

import 'mocha';
import { Injectable } from '../../src';
import { DependencyContainer } from '../../src/injector/dependency-container';

describe('Injector tests', () => {

    @Injectable()
    class AService {
    }

    @Injectable()
    class BService {
        constructor(public aservice: AService) {
        }
    }

    @Injectable()
    class CService {
        constructor(public aservice: AService, public bservice: BService) {
        }
    }

    @Injectable()
    class ScopeInstance {
        public random = Math.random();
    }

    @Injectable('singleInstance')
    class SingleInstance {
        public random = Math.random();
    }

    @Injectable('transientInstance')
    class TransientInstance {
        public random = Math.random();
    }

    it('Should resolve instance that have nested instances', () => {
        const cservice = DependencyContainer.resolve(CService);

        const bservice = cservice.bservice;
        const aservice = cservice.aservice;

        expect(cservice).not.to.be.undefined;
        expect(aservice).not.to.be.undefined;
        expect(bservice).not.to.be.undefined;
    });

    it('Should revolve scoped instances', () => {
        const firstSingleInstance = DependencyContainer.resolve(ScopeInstance);
        const secondSingleInstance = DependencyContainer.resolve(ScopeInstance);

        expect(firstSingleInstance === secondSingleInstance).to.be.true;
    });

    it('Should revolve transient instances', () => {
        const firstSingleInstance = DependencyContainer.resolve(TransientInstance);
        const secondSingleInstance = DependencyContainer.resolve(TransientInstance);

        expect(firstSingleInstance === secondSingleInstance).to.be.false;
    });

    it('Should resolve single instances', () => {
        const firstSingleInstance = DependencyContainer.resolve(SingleInstance);
        const secondSingleInstance = DependencyContainer.resolve(SingleInstance);

        expect(firstSingleInstance === secondSingleInstance).to.be.true;
    });

    it('Should resolve different scoped instances after createScope is called', () => {
        const firstSingleInstance = DependencyContainer.resolve(ScopeInstance);
        DependencyContainer.createScope();
        const secondSingleInstance = DependencyContainer.resolve(ScopeInstance);

        expect(firstSingleInstance === secondSingleInstance).to.be.false;
    });

    it('Should throw exception when injectable is not found in the container', () => {
        class NonInjectable { }
        const action = () => DependencyContainer.resolve(NonInjectable);

        expect(action).to.throw();
    });
});
