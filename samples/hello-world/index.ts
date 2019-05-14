import { WebApi, WebApiBuilder } from '@typenet/core/lib/src';
import { DummController } from './dummy.controller';

@WebApi({
    settings: {
        port: 30001
    },
    controllers: [DummController]
})
class Startup { }

const builder = new WebApiBuilder().useStartupClass(Startup).run();