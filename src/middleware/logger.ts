import { IncomingMessage, ServerResponse } from "http";

export function logger(req: IncomingMessage, res: ServerResponse, next: () => void) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}