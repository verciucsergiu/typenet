import { expect } from 'chai';
import 'reflect-metadata';

import 'mocha';
import { Injectable, DependencyContainer } from '../src';

describe('Injector tests', () => {

    @Injectable()
    class AService {
        public counter = 1;
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

    it('Should create an instance of the AService class', () => {

        const bservice = DependencyContainer.resolve(BService) as BService;

        const service = bservice.aservice;

        expect(service).not.to.be.undefined;
    });

    it('Should create an instance of AService and BService classes when CService is requested', () => {
        const cservice = DependencyContainer.resolve(CService) as CService;

        const bservice = cservice.bservice;
        const aservice = cservice.aservice;

        expect(aservice).not.to.be.undefined;
        expect(bservice).not.to.be.undefined;
    });

    it('Should not create multiple instances of the same class in the same dependency tree', () => {
        const cservice = DependencyContainer.resolve(CService) as CService;
        cservice.aservice.counter = 300;

        expect(cservice.bservice.aservice.counter).to.not.be.equal(300);
    });

    it('Should create new instances per request', () => {
        const cservice = DependencyContainer.resolve(CService) as CService;
        cservice.aservice.counter = 300;
        const secondService = DependencyContainer.resolve(CService) as CService;

        expect(secondService.aservice.counter).to.not.be.equal(300);
    });
});

