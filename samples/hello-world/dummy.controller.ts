import { Controller, HttpGet, IActionResult, Ok } from "@typenet/core";

@Controller('api/dummy')
export class DummController {

    @HttpGet('')
    public helloWorld(): IActionResult {
        return new Ok('hello world');
    }
}