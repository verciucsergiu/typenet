import { RequestBodyProvider } from "../../src/request-handling/request-body-parser";
import { expect } from 'chai';

import * as mockReq from 'mock-req';

import { IncomingMessage } from "http";

describe('Request body parser', () => {

    describe('When request method is POST and has body', () => {

        it('should return an object', () => {
            const sut = new RequestBodyProvider();
            const expected = { test: 123 };
            const request = new mockReq({ method: 'POST', url: 'none' });

            request.write(JSON.stringify(expected));
            request.end();

            sut.getBodyAsJson(request as IncomingMessage, 4096).then(body => {
                expect(body).to.deep.equal(expected);
            });
        });

    });

    describe('When request method is GET and has no body', () => {
        it('should return null', () => {
            const sut = new RequestBodyProvider();
            const request = new mockReq({ method: 'GET', url: 'none' });

            sut.getBodyAsJson(request as IncomingMessage, 4096).then(body => {
                expect(body).to.deep.equal(null);
            });
        });
    });
});