import { HttpVerb } from "../../controller";
import { isArray } from "util";
import { Tree } from "../../routing/tree";

export class CorsOptions {
    constructor(
        private readonly allowOrigin: string,
        private readonly allowHeader: string,
        private readonly allowMethods: string) { }

    public toHeaders(): Tree<string> {
        const headers = {};
        if (this.allowOrigin) {
            headers['Access-Control-Allow-Origin'] = this.allowOrigin;
        }

        if (this.allowHeader) {
            headers['Access-Control-Allow-Headers'] = this.allowHeader;
        }

        if (this.allowMethods) {
            headers['Access-Control-Allow-Methods'] = this.allowMethods;
        }

        return headers;
    }
}

export class CorsBuilder {
    private origins: string | string[];
    private headers: string | string[];
    private methods: HttpVerb | HttpVerb[];

    public allowAnyOrigins(): this {
        this.origins = '*';
        return this;
    }

    public allowAnyMethods(): this {
        this.methods = ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS' as HttpVerb];
        return this;
    }

    public allowAnyHeaders(): this {
        this.headers = '*';
        return this;
    }

    public withHeaders(...params: string[]): this {
        this.headers = params;
        return this;
    }

    public withMethods(...parmas: HttpVerb[]): this {
        this.methods = parmas;
        return this;
    }

    public withOrigins(...params: string[]): this {
        this.origins = params;
        return this;
    }

    public build(): CorsOptions {
        const methods = isArray(this.methods) ? this.methods.join(', ') : this.methods;
        const headers = isArray(this.headers) ? this.headers.join(', ') : this.headers;
        const origins = isArray(this.origins) ? this.origins.join(', ') : this.origins;

        return new CorsOptions(origins, headers, methods);
    }
}