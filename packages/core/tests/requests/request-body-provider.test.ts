import { RequestBodyProvider } from "../../src/request-handling/request-body-parser";
import { expect } from 'chai';

import * as mockReq from 'mock-req';

import { IncomingMessage } from "http";
import { ApplicationSettings } from "../../src";

describe('Request body parser', () => {

    it('Should return an object when request method is POST and has body', () => {
        const sut = new RequestBodyProvider(ApplicationSettings.defaultSettings());
        const expected = { test: 123 };
        const request = new mockReq({ method: 'POST', url: 'none' });

        request.write(JSON.stringify(expected));
        request.end();

        sut.getBodyAsJson(request as IncomingMessage).then((body) => {
            expect(body).to.deep.equal(expected);
        });
    });

    it('Should return null when request method is GET and has no body', () => {
        const sut = new RequestBodyProvider(ApplicationSettings.defaultSettings());
        const request = new mockReq({ method: 'GET', url: 'none' });

        sut.getBodyAsJson(request as IncomingMessage).then((body) => {
            expect(body).to.deep.equal(null);
        });
    });

    it('Should throw exception when body payload exceeds maxRequestSize setting', () => {
        const sut = new RequestBodyProvider(new ApplicationSettings({ maxRequestSize: 10 }));
        const request = new mockReq({ method: 'POST', url: 'none' });
        request.write('12345678901232141241241');
        request.end();

        sut.getBodyAsJson(request as IncomingMessage).then(() => expect(true).to.be.false).catch(() => expect(true).to.be.true);
    });
});