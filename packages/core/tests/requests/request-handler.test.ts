import 'mocha';
import { Controller, ActionResult, Ok, HttpGet, FromRoute, HttpPost, FromBody, Created, HttpDelete, FromQuery, NoContent } from '../../src';
import { of } from 'rxjs';
import { expect } from 'chai';

import * as mockReq from 'mock-req';
import * as mockRes from 'mock-res';

import { IncomingMessage } from "http";
import { RequestBodyProvider } from '../../src/request-handling/request-body-parser';
import { JSONResponseHandler } from '../../src/request-handling/json-response-handler';
import { DefaultRequestHandler } from '../../src/request-handling/default-request-handler';
import { HttpContextFactory } from "../../src/controller/http-context-factory";
import { ApplicationSettings } from '../../src/application';

describe('Request handler tests', () => {
    const testResource = 'test/resource';
    const observableResponse = 'obs response';
    const promiseResponse = 'promise response';
    const syncResponse = 'sync response';

    @Controller(testResource)
    class ResourceController {


        @HttpGet(':id')
        getById(@FromRoute(':id') id: string): ActionResult {
            return new Ok(id);
        }

        @HttpPost('')
        create(@FromBody() body: any): ActionResult {
            return new Created(body);
        }

        
        @HttpDelete('')
        delete(@FromQuery() query: any): ActionResult {
            return new NoContent(query);
        }


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
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(observableResponse);
        });
    });

    it('Should return the promise result', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/promise` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(promiseResponse);
        });
    });

    it('Should return the sync result', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(syncResponse);
        });
    });


    it('Should handle exceptions', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/error` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(500);
            expect(response._getJSON()).to.be.eq("Internal server error!");
        });
    });

    it('Should handle promise rejections', () => {
        const req = new mockReq({ method: 'GET', url: `/${testResource}/promiseError` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(500);
            expect(response._getJSON()).to.be.eq("Internal server error!");
        });
    });

    it('Should return not found when invalid route provided', () => {
        const req = new mockReq({ method: 'GET', url: `something` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(404);
            expect(response._getJSON()).to.be.eq("Not found!");
        });
    });


    it('Should inject from route', () => {
        const expectedId = '902392';
        const req = new mockReq({ method: 'GET', url: `/${testResource}/${expectedId}/` }) as IncomingMessage;
        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(200);
            expect(response._getJSON()).to.be.eq(expectedId);
        });
    });

    it('Should inject from body', () => {
        const expected = { hello: "world" };
        const req = new mockReq({ method: 'POST', url: `/${testResource}/` });
        req.write(JSON.stringify(expected));
        req.end();

        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(201);
            expect(response._getJSON()).to.be.deep.eq(expected);
        });
    });


    it('Should inject from query', () => {
        const expected = { hello: "world" };
        const req = new mockReq({ method: 'DELETE', url: `/${testResource}?hello=world` });
        req.end();

        const response = new mockRes();
        const sut = new DefaultRequestHandler(new HttpContextFactory(new RequestBodyProvider(ApplicationSettings.defaultSettings())), new JSONResponseHandler());

        sut.handle(req, response);

        response.on('finish', () => {
            expect(response.statusCode as number).to.be.eq(204);
            expect(response._getJSON()).to.be.deep.eq(expected);
        });
    });
});