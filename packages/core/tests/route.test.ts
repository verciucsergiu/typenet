import { expect } from 'chai';
import 'mocha';
import { Route, RouteSegment } from '../src/app-container/route';

describe('Route', () => {

    it('Given create should return a valid route object', () => {
        const result = Route.create("test/1/3/4/appp");

        expect(result).to.be.an('array').and.deep.equal(['test', '1','3', '4', 'appp'].map(x => new RouteSegment(x)));
    });

    it('Given create should remove first slash', () => {
        const result = Route.create("/test/1/3/4/appp");

        expect(result).to.be.an('array').and.deep.equal(['test', '1','3', '4', 'appp'].map(x => new RouteSegment(x)));
    });

    it('Given create should remove last slash', () => {
        const result = Route.create("test/1/3/4/appp/");

        expect(result).to.be.an('array').and.deep.equal(['test', '1','3', '4', 'appp'].map(x => new RouteSegment(x)));
    });

    it('Given create should throw exception when invalid route is provided', () => {
        const action = () => Route.create("test/1//4/appp/");

        expect(action).to.throw();
    });
});