import { Controller, HttpGet, ActionResult, Ok } from '@typenet/core';

@Controller('api/dummy')
export class DummyController {

    @HttpGet('')
    public helloWorld(): ActionResult {
        return new Ok({ hello: 'hello world' });
    }
}