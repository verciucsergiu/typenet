import { TemplateGenerator } from "./template-generator";
import { Loader } from "./loader";
import * as changeCase from 'change-case';
import * as writeFile from 'write';
import chalk from "chalk";

export class ControllerGenerator extends TemplateGenerator {
    public templateName: string = 'controller';
    public alias: string = 'c';

    constructor(private readonly loader: Loader) {
        super();
    }

    public generateTemplate(path: string): void {
        const pathSplited = path.split('/');
        const controllerNameFromPath = pathSplited[pathSplited.length - 1];
        const pascaledCasedModuleName = changeCase.pascalCase(controllerNameFromPath);
        this.loader.start(chalk.yellow.bold(`Creating "${pascaledCasedModuleName}Controller" file...`));
        const template: string = createTemplate(`${pascaledCasedModuleName.toLowerCase()}`, `${pascaledCasedModuleName}Controller`);
        this.writeTemplate(template, path, `${pascaledCasedModuleName}Controller`);
    }

    private writeTemplate(template: string, path: string, controllerName: string): void {
        const fullPath = `${path}.${this.templateName}.ts`;
        writeFile(fullPath, template, (err) => {
            if (err) {
                this.loader.fail(chalk.red.bold(`Failed to create "${controllerName}". Please try again!`));
                process.exit(1);
            }

            this.loader.succeed(chalk.green.bold(`Created ${controllerName}.\n  Don't forget to add it to its Module!\n  Path: "${fullPath}"`));
        });
    }
}

const createTemplate = (route: string, controllerName: string) =>
    `import {
    Controller, HttpGet,
    ActionResult, Ok,
    HttpPost, Created,
    FromRoute, HttpPut,
    FromBody, NoContent,
    HttpDelete
} from '@typenet/core';

@Controller('api/${route}')
export class ${controllerName} {

    @HttpGet('')
    public get(): ActionResult {
        return new Ok([1, 2, 3]);
    }

    @HttpGet(':id')
    public getById(@FromRoute(':id') id: string): ActionResult {
        return new Ok(id);
    }

    @HttpPost('')
    public create(@FromBody() resource: any): ActionResult {
        return new Created(resource);
    }

    @HttpPut(':id')
    public update(@FromRoute(':id') id: string): ActionResult {
        return new NoContent();
    }

    @HttpDelete(':id')
    public delete(@FromRoute(':id') id: string): ActionResult {
        return new NoContent();
    }
}`;