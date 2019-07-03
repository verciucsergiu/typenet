export abstract class TemplateGenerator {
    public abstract get templateName(): string;
    public abstract get alias(): string;
    public abstract generateTemplate(path: string): void;
}
