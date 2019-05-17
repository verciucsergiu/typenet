import { Controller, HttpGet, Ok, ActionResult  } from "@typenet/core/src";

@Controller('api/dummy')
export class DummController {

    @HttpGet('')
    public helloWorld(): ActionResult {
        return new Ok('hello world');
    }
}