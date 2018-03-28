import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { GetStudentsQuery } from "./get-students.query";
import { GetStudentsQueryResult } from "./get-students.query.result";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";

@QueryHandler({
    queryType: GetStudentsQuery,
    resultType: GetStudentsQueryResult
})
export class GetStudentsQueryHandler implements IQueryHandler<GetStudentsQuery, GetStudentsQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository) {

    }

    public async retrieve(query: GetStudentsQuery): Promise<GetStudentsQueryResult> {
        const result = await this.repository.getAll();
        const mappedResult = result.map((st: StudentModel) => Object.assign(new StudentModel(), st));
        return new GetStudentsQueryResult(mappedResult);

    }
}