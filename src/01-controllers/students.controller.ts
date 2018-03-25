import { Controller, HttpGet, HttpPost, FromBody, FromRoute, IActionResult, Ok } from '../../framework/core';
import { Student } from '../03-core/domain';

@Controller('api/students')
export class StudentsController {

    @HttpGet('{id}')
    public getStudentById(@FromRoute('{id}') id: string): IActionResult {
        return new Ok('oki');
    }

    @HttpPost('')
    public addNewStudent(@FromBody() emplyee: Student): IActionResult {
        console.log(emplyee.lastName);
        return new Ok();
    }

    @HttpPost('{id}/delete')
    public addNewStudentById(@FromRoute('{id}') id: string, @FromBody() emplyee: Student): IActionResult {
        console.log(emplyee);
        return new Ok();
    }
}