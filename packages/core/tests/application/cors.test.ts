import 'mocha';
import { CorsBuilder, CorsOptions } from '../../src';

import { expect } from 'chai';

describe('CORS options', () => {

    it('Should convert to header', () => {
        const cors = new CorsOptions('localhost', 'Content-Type', 'GET');
        const expected = { 'Access-Control-Allow-Origin': 'localhost', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET' };

        const result = cors.toHeaders();

        expect(result).to.be.deep.equal(expected);
    });
});

describe('CORS builder', () => {
    let builder: CorsBuilder;

    beforeEach(() => {
        builder = new CorsBuilder();
    });

    it('Shoud build a cors options', () => {
        const result = builder.build();

        expect(result).to.not.be.undefined;
    });

    it('Should set Access-Control-Allow-Headers to * when allowAnyHeaders is called', () => {
        const expected = { 'Access-Control-Allow-Headers': '*' };

        const result = builder.allowAnyHeaders().build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });

    it(`Should set Access-Control-Allow-Methods to 'GET, PATCH, POST, PUT, DELETE, OPTIONS' when allowAnyMethods is called`, () => {
        const expected = { 'Access-Control-Allow-Methods': 'GET, PATCH, POST, PUT, DELETE, OPTIONS' };

        const result = builder.allowAnyMethods().build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });

    it('Should set Access-Control-Allow-Origin to * when allowAnyOrigins is called', () => {
        const expected = { 'Access-Control-Allow-Origin': '*' };

        const result = builder.allowAnyOrigins().build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });

    it('Should set Access-Control-Allow-Headers to given parameters joined by , when withHeaders is called', () => {
        const expected = { 'Access-Control-Allow-Headers': 'Content-type, Authorization' };

        const result = builder.withHeaders('Content-type', 'Authorization').build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });

    it(`Should set Access-Control-Allow-Methods to given parameters joined by , when withMethods is called`, () => {
        const expected = { 'Access-Control-Allow-Methods': 'PATCH, POST' };

        const result = builder.withMethods('PATCH', 'POST').build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });

    it('Should set Access-Control-Allow-Origin to given parameters joined by , when withOrigins is called', () => {
        const expected = { 'Access-Control-Allow-Origin': 'localhost1, localhost2, localhost3' };

        const result = builder.withOrigins('localhost1', 'localhost2', 'localhost3').build().toHeaders();

        expect(result).to.be.deep.equal(expected);
    });
});