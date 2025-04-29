import { IncomingMessage, ServerResponse } from "node:http";
import { App } from "./App.ts";
import { requestTime } from "./middleware/request-time.ts";
import { logger } from "./middleware/logger.ts";
import { handleGetTasks } from "./controllers/tasks-controller.ts";
import {jsonBodyParser} from "./middleware/json-body-parser.ts";

const port = 3000;
const hostname = "localhost";

const app = new App();
app.use(requestTime);

app.get("/", (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello from "/" endpoint.`)
}, [logger])

app.get('/tasks', handleGetTasks, [logger])
app.post('/tasks', () => {}, [jsonBodyParser])

app.start(port, hostname);