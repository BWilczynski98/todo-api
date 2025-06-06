import {dirname, join} from "path"
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function buildFilePath(path: string): string {
    return join(__dirname, path);
}