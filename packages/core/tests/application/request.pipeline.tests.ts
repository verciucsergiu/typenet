import 'mocha';
import { expect } from 'chai';
import { PipelineMiddleware, HttpContext, Middleware } from '../../src';
import { ClassDefinition } from '../../src/application/types/class-definition';
import { RequestPipeline } from '../../src/application/request.pipeline';
import { IncomingMessage, ServerResponse } from 'http';
import { ApplicationContainer } from '../../src/application/application-container';

describe('Request pipeline', () => {
    let sut;
    beforeEach(() => {
        const mockedRequestHandeler = { handle: (httpContext: HttpContext) => Promise.resolve() };
        const mockedHttpContextFactory = { create: (i: IncomingMessage, r: ServerResponse) => ({}) };

        sut = new RequestPipeline(mockedRequestHandeler as any, mockedHttpContextFactory as any);
    });

    it('Should handle all middlewares in the oreder that they were registered.', () => {
        const executionPipeline: ClassDefinition[] = [];
        // HOT FIX
        ApplicationContainer['middlewares'] = [];

        @Middleware()
        class FirstMiddleware implements PipelineMiddleware {
            public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
                executionPipeline.push(FirstMiddleware);
                await next();
            }
        }

        @Middleware()
        class SecondMiddleware implements PipelineMiddleware {
            public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
                executionPipeline.push(SecondMiddleware);
                await next();
            }
        }

        @Middleware()
        class ThirdMiddleware implements PipelineMiddleware {
            public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
                executionPipeline.push(ThirdMiddleware);
                await next();
            }
        }
        const expectedExecution: ClassDefinition[] = [FirstMiddleware, SecondMiddleware, ThirdMiddleware];

        sut.resolveRequest({} as any, {} as any);

        expect(executionPipeline).to.be.ordered.members(expectedExecution);
    });

    it('Should request return through the middleware after request handling', async () => {
        let beforeNext = false;
        let afterNext = false;

        @Middleware()
        class RandomMiddleware implements PipelineMiddleware {
            public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
                beforeNext = true;
                await next();
                afterNext = true;
            }
        }

        await sut.resolveRequest({} as any, {} as any);

        expect(beforeNext).to.be.true;
        expect(afterNext).to.be.true;
    });
});