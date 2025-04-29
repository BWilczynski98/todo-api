import { IncomingMessage, ServerResponse } from "http";

export function requestTime(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⏱ Request to ${req.url} took ${duration}ms`);
    })

    next();
}