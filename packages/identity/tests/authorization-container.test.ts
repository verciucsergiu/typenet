import 'mocha';
import { ActionResult, Ok } from '@typenet/core';
import { AuthorizeController, AuthorizeMethod } from '../src';

describe('Authorization container test', () => {
    it('Should be possible to decorate controllers as well as controller\'s methods', () => {
        const decoration = () => {
            @AuthorizeController()
            class Controller {

                @AuthorizeMethod()
                public get(): ActionResult {
                    return new Ok();
                }
            }
        };

        decoration();
    });
});