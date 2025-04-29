import { IncomingMessage, ServerResponse } from "http";

export function errorHandler(err: Error, req: IncomingMessage, res: ServerResponse) {
    console.error("Caught error:", err);
    res.writeHead(500, {'Content-Type': 'text/plain'}).end(err.message);
}