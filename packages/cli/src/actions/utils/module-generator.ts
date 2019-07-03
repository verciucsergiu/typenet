import { TemplateGenerator } from "./template-generator";
import { Loader } from "./loader";
import * as changeCase from 'change-case';
import * as writeFile from 'write';
import chalk from "chalk";

export class ModuleGenerator extends TemplateGenerator {
    public templateName: string = 'module';
    public alias: string = 'm';

    constructor(private readonly loader: Loader) {
        super();
    }

    public generateTemplate(path: string): void {
        const pathSplited = path.split('/');
        const moduleNameFromPath = pathSplited[pathSplited.length - 1];
        const pascaledCasedModuleName = changeCase.pascalCase(moduleNameFromPath);
        this.loader.start(chalk.yellow.bold(`Creating "${pascaledCasedModuleName}Module" file...`));
        const template: string = createTemplate(`${pascaledCasedModuleName}Module`);
        this.writeTemplate(template, path, `${pascaledCasedModuleName}Module`);
    }

    private writeTemplate(template: string, path: string, moduleName: string): void {
        const fullPath = `${path}.${this.templateName}.ts`;
        writeFile(fullPath, template, (err) => {
            if (err) {
                this.loader.fail(chalk.red.bold(`Failed to create "${moduleName}". Please try again!`));
                process.exit(1);
            }

            this.loader.succeed(chalk.green.bold(`Created ${moduleName}. Path: "${fullPath}"`));
        });
    }
}

const createTemplate = (moduleName: string): string =>
`import { Module } from "@typenet/core";

@Module({
    controllers: []
})
export class ${moduleName} { }`;
