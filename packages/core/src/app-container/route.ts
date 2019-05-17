export class Route extends Array<RouteSegment> {

    public static create(url: string): Route {
        if (url) {
            const parsedRoute = url.toLowerCase().split('/');
            const indexOfEmptySegments = parsedRoute.indexOf('');
            if (indexOfEmptySegments > 0 && indexOfEmptySegments < parsedRoute.length - 1) {
                throw new Error(`Invalid route: ${url}`);
            }

            return parsedRoute.filter(x => x != '').map(x => new RouteSegment(x));
        } else {
            return Route.empty();
        }
    }

    public static empty(): Route {
        return [new RouteSegment('')];
    }

    public toString(): string {
        return this.join('/');
    }
}

export class RouteSegment {
    constructor(public readonly value: string) { }

    public get isParameter(): boolean {
        return this.value.startsWith(':');
    }

    public toString(): string {
        return this.value;
    }
}