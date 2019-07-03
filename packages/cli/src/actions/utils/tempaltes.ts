import { TemplateGenerator } from "./template-generator";
import { ControllerGenerator } from "./controller-generator";
import { ModuleGenerator } from "./module-generator";
import chalk from "chalk";
import { Loader } from "./loader";

export class Templates {
    private readonly generators: TemplateGenerator[] = [
        new ControllerGenerator(this.loader),
        new ModuleGenerator(this.loader)
    ];

    constructor(private readonly loader: Loader) {
    }

    public generate(template: string, path: string): void {
        const generator = this.getGenerator(template);
        if (generator) {
            generator.generateTemplate(path);
        } else {
            this.handleUnexistentTemplate(template);
        }
    }

    private getGenerator(template: string): TemplateGenerator {
        return this.generators.find((x) => x.templateName === template || x.alias === template);
    }

    private handleUnexistentTemplate(template: string): void {
        console.log(chalk.red.bold(`Invalid template: "${template}"`));
        const validTemplates = this.generators.map((x) => `${x.templateName}\t | ${x.alias}`);
        const validTemplatesText = `Valid templates:\n\t${validTemplates.join('\n\t')}`;
        console.log(chalk.green.bold(validTemplatesText));
        process.exit(1);
    }
}