import { HttpGet, Controller, HttpPost, IActionResult, Ok, Created, FromRoute } from "@typenet/core";

@Controller('api/students')
export class StudentsController {

    @HttpGet('')
    public async getStudents(): Promise<IActionResult> {
        return new Ok('stundets');
    }

    @HttpPost('')
    public async addNewStudent(): Promise<IActionResult> {
        return new Created();
    }

    @HttpPost('{id}/delete')
    public addNewStudentById(@FromRoute('{id}') id: string): IActionResult {
        return new Ok();
    }
}