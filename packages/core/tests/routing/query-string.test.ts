import { QueryString } from "../../src";
import { expect } from 'chai';

describe("Query string", () => {

    it("Should create object accordingly", () => {
        const expected = {startDate: '123', endDate: '321'};
        const query = "startDate=123&endDate=321";
        const queryString = new QueryString(query);

        const result = queryString.toObject();


        expect(result).to.be.deep.equal(expected);
    });

});