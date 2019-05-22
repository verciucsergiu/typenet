import 'mocha';

import { expect, assert } from 'chai';
import { Controller } from '../../src';

describe('Controller decorator', () => {
    it('Should throw exception when string empty is passed as route', () => {
        const action = () => {
            @Controller('')
            class WrongControllerConfig { }
        };

        expect(action).to.throw();
    });
});