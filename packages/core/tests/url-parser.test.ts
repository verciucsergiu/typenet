import { expect } from 'chai';
import 'mocha';
import { UrlHelper } from '../src/app-container/url-parser.helper';


describe('Url parser', () => {

    it('Should split after / ', () => {
        const result = UrlHelper.parse("test/1/3/4/appp");

        expect(result).to.be.an('array').and.deep.equal(['test', '1','3', '4', 'appp']);
    });

    it('Should throw error for invalid url', () => {
        expect(() => UrlHelper.parse('/test/')).to.throw();
    })
});