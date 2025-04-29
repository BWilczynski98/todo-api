import {IncomingMessage, ServerResponse} from "node:http";

export function jsonBodyParser(req: IncomingMessage, res: ServerResponse, next: (err: Error) => void) {
    if (req.headers['content-type'] !== 'application/json') {
        return next(new Error('The body must be passed in JSON format'));
    }

    let body = null;
}