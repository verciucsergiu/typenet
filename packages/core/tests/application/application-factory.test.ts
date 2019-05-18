import 'mocha';
import { expect } from 'chai';
import { ApplicationFactory } from '../../src';

describe('Application factory', () => {


    it('Should override settings', () => {
        const app = ApplicationFactory.create();
        const setting = { maxRequestSize: 30 };

        app.useSettings(setting);

        expect(app['settings'].maxRequestSize).to.be.equal(30);
    });
});

