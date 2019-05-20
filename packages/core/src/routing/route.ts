export class Route extends Array<RouteSegment> {

    private constructor(items?: RouteSegment[]) {
        super(...items);
    }

    public static create(items?: RouteSegment[]): Route;
    public static create(url: string): Route;
    public static create(url: string | RouteSegment[]): Route {
        if (this.isArray(url)) {
            const interalRoute = this.createInternal();
            interalRoute.push(...url);
            return interalRoute;
        } else {
            return this.createInternalFromUrl(url);
        }
    }

    public static empty(): Route {
        const internalRoute = this.createInternal();
        internalRoute.push(new RouteSegment(''));
        return internalRoute;
    }

    public toString(): string {
        return this.join('/');
    }

    private static createInternalFromUrl(url: string): Route {
        if (url) {
            const parsedRoute = url.toLowerCase().split('/');
            const indexOfEmptySegments = parsedRoute.indexOf('');
            if (indexOfEmptySegments > 0 && indexOfEmptySegments < parsedRoute.length - 1) {
                throw new Error(`Invalid route: ${url}`);
            }
            const internalRoute = this.createInternal();
            internalRoute.push(...parsedRoute.filter((x) => x !== '').map((x) => new RouteSegment(x)));
            return internalRoute;
        } else {
            return Route.empty();
        }
    }

    private static createInternal(): Route {
        return Object.create(Route.prototype);
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