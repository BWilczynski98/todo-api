import {readFile} from "fs/promises";
import {buildFilePath} from "../utils/build-file-path.ts";
import {existsSync} from "node:fs";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export async function getAllTasks(): Promise<Task[]> {
    const filePath = buildFilePath("../data/todos.json");
    if (!existsSync(filePath)) return [];
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

// export async function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
//
// }