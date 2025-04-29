import { IncomingMessage, ServerResponse } from "http";
import { errorHandler } from "./error-handler.ts";

type CallableElementFromStack = (req: IncomingMessage, res: ServerResponse, next: () => void) => void | Promise<void>;

export function middleware(stack: CallableElementFromStack[], req: IncomingMessage, res: ServerResponse) {
    let i = 0;

    function next(err?: any) {

        if (err) {
            console.log('Error handler');
            return errorHandler(err, req, res)
        }

        if (i >= stack.length) return;

        const fn = stack[i++];
        try {
            Promise.resolve(fn(req, res, next)).catch(next);
        } catch (error) {
            next(error);
        }
    }

    next();
}