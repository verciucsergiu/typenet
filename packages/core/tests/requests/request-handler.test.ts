import 'mocha';
import { Controller, ActionResult, Ok, HttpGet } from '../../src';
import { of } from 'rxjs';
import { expect } from 'chai';

import * as mockReq from 'mock-req';
import * as mockRes from 'mock-res';

import { IncomingMessage } from "http";
import { RequestBodyProvider } from '../../src/handlers/request-body-parser';
import { JsonResponseHandler } from '../../src/handlers/json-response-handler';
import { AppContainer } from '../../src/app-container/app-container';
import { RequestHandler } from '../../src/handlers/request-handler';

describe('Request handler tests', () => {
    const testResource = 'test/resource';
    const observableResponse = 'obs response';
    const promiseResponse = 'promise response';
    const syncResponse = 'sync response';

    @Controller(testResource)
    class ResourceController {


        @HttpGet('observable')
        getObservable(): ActionResult {
            return new Ok(of(observableResponse));
        }


        @HttpGet('promise')
        getPromise(): ActionResult {
            return new Ok(new Promise((resolve) => resolve(promiseResponse)));
        }

        @HttpGet('')
        get() {
            return new Ok(syncResponse);
        }

        @HttpGet('error')
        throw() {
            var result = () => {
                throw new Error('something is wrong');
            }
            return new Ok(result());
        }

        @HttpGet('promiseError')
        promiseError() {
            return new Ok(Promise.reject('Resource not found!'));
        }
    }


    it('Should return the observable result', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/observable` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(observableResponse);
        });
    });

    it('Should return the promise result', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/promise` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(promiseResponse);
        });
    });

    it('Should return the sync result', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(syncResponse);
        });
    });


    it('Should handle exceptions', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/error` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(500);
            expect(response._getJSON()).to.be.eq("Internal server error!");
        });
    });

    it('Should handle promise rejections', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/promiseError` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(500);
            expect(response._getJSON()).to.be.eq("Internal server error!");
        });
    });

    it('Should return not found when invalid route provided', () => {
        const req = new mockReq({ method: 'GET', url: `something` }) as IncomingMessage;
        const response = new mockRes();
        AppContainer.settings = { port: 3000, maxRequestSize: 4096 };
        const sut = new RequestHandler(new RequestBodyProvider(), new JsonResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(404);
            expect(response._getJSON()).to.be.eq("Not found!");
        });
    });
});