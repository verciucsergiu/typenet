import { PipelineMiddleware } from '../middleware/middleware';
import { CorsOptions } from './cors-options';
import { Tree } from '../../routing/tree';
import { HttpContext } from '../types/http-context';

export class CorsMiddleware implements PipelineMiddleware {
    private readonly corsHeaders: Tree<string> = {};
    constructor(corsOptions: CorsOptions) {
        this.corsHeaders = corsOptions.toHeaders();
    }

    public apply(context: HttpContext, next: Function): void {
        for (const key in this.corsHeaders) {
            if (this.corsHeaders.hasOwnProperty(key)) {
                const element = this.corsHeaders[key];
                context.response.setHeader(key, element);
            }
        }

        next();
    }

}