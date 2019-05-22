import 'mocha';
import { CorsMiddleware } from '../../src/application/cors/cors.middleware';

import { expect } from 'chai';
import { CorsBuilder as CorsOptionsBuilder, RequestContext, ResponseContext } from '../../src';

describe('CORS Middleware', () => {

    it('Should add cors options to header', () => {
        const middleware = new CorsMiddleware(new CorsOptionsBuilder().withMethods('PUT').build());
        const expected = { 'Access-Control-Allow-Methods': 'PUT' };
        const headers = {};
        const setHeader = (key, value) => {
            headers[key] = value;
        };
        const mockHttpContext = { request: {} as any as RequestContext, response: { setHeader } as any as ResponseContext };

        middleware.apply(mockHttpContext, () => { });

        expect(headers).to.be.deep.equal(expected);
    });
});
