import { expect } from 'chai';
import 'mocha';
import { UrlParser } from '../src/app-container/url-parser.helper';


describe('Url parser', () => {

    it('On given url should split after / ', () => {
        const result = UrlParser.parse("test/1/3/4/appp");

        expect(result).to.be.an('array').and.deep.equal(['test', '1','3', '4', 'appp']);
    });
});