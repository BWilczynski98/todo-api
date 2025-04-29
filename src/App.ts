import { createServer, IncomingMessage, ServerResponse } from "node:http";
import type { Middleware, Route, RouteHandler, Routes } from "./Router.ts";
import { Methods, Router } from "./Router.ts";
import { isMethod } from "./utils/is-method.ts";
import { middleware } from "./middleware/middleware.ts";

export class App {
    private router: Router;
    private middlewares: Middleware[] = [];

    constructor() {
        this.router = new Router();
    }

    public get(path: string, handler: RouteHandler, middleware?: Middleware[]) {
        this.router.addRoute(Methods.GET, path, handler, middleware);
    }

    public post(path: string, handler: RouteHandler, middleware?: Middleware[]) {
        this.router.addRoute(Methods.POST, path, handler, middleware);
    }

    public getRoutes(): Routes {
        return this.router.allRoutes();
    }

    public use(middleware: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) {
        this.middlewares.push(middleware);
    }

    public start(port: number = 8080, hostname: string = "127.0.0.1") {
        const server = createServer((req: IncomingMessage, res: ServerResponse) => {
            const method = req.method?.toUpperCase();
            const { pathname } = new URL(`http://${hostname}${req.url}`);

            if (!isMethod(method)) {
                res.statusCode = 405;
                res.end('Method Not Allowed');
                return;
            }

            const route = this.router.match(method, pathname);

            if (route) {
                this.call(route, req, res);
            }
        });

        server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
    }

    private call(route: Route, req: IncomingMessage, res: ServerResponse) {
        const stack = [...this.middlewares, ...route.middleware, route.handler];
        middleware(stack, req, res);
        return;
    }
}