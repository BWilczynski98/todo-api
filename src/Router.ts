import { IncomingMessage, ServerResponse } from "node:http";

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

export interface Route {
    path: string,
    handler: RouteHandler,
    middleware: Middleware[];
}

export interface Routes { GET: Route[]; POST: Route[]; PUT: Route[]; PATCH: Route[]; DELETE: Route[] };


export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export class Router {
    private routes: Routes;

    constructor() {
        this.routes = {
            [Methods.GET]: [],
            [Methods.POST]: [],
            [Methods.PUT]: [],
            [Methods.PATCH]: [],
            [Methods.DELETE]: []
        };
    }

    public addRoute(method: Methods, path: string, handler: RouteHandler, middleware: Middleware[] = []) {
        const newRoute = {
            path,
            handler,
            middleware,
        };

        this.routes[method].push(newRoute);
    }

    public allRoutes(): { GET: Route[]; POST: Route[]; PUT: Route[]; PATCH: Route[]; DELETE: Route[] } {
        return this.routes;
    }

    public match(method: Methods, path: string): Route | undefined {
        return this.routes[method].find(route => route.path === path);
    }
}