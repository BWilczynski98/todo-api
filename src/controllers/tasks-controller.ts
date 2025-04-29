import { IncomingMessage, ServerResponse } from "http";
import { getAllTasks } from "../models/tasks-model.ts";

export async function handleGetTasks(req: IncomingMessage, res: ServerResponse) {
    const tasks = await getAllTasks();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(tasks));
}

export async function handlePostTask(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    
}