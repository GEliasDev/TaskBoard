import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { taskCreateSchema, taskUpdateSchema } from './tasks.schema.js';
import { AppError } from '../../middlewares/appError.js';

const FILE_PATH = path.join(process.cwd(), 'tasks.json');

const loadTasks = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return new Map(JSON.parse(data));
    } catch {
        return new Map();
    }
};

const saveTasks = async (tasksMap) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(Array.from(tasksMap.entries()), null, 2));
};

let tasks = await loadTasks();

export const TaskService = {
    getAllTasks: () => Array.from(tasks.values()),

    createTask: async (data) => {
        const parsed = taskCreateSchema.parse(data);
        const task = { id: randomUUID(), ...parsed, createdAt: new Date().toISOString() };
        tasks.set(task.id, task);
        await saveTasks(tasks);
        return task;
    },

    updateTask: async (id, data) => {
        const task = tasks.get(id);
        if (!task) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        const parsed = taskUpdateSchema.parse(data);
        const updated = { ...task, ...parsed, updatedAt: new Date().toISOString() };
        tasks.set(id, updated);
        await saveTasks(tasks);
        return updated;
    },

    completeTask: async (id) => {
        const task = tasks.get(id);
        if (!task) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        const updated = { ...task, status: 'completed', updatedAt: new Date().toISOString() };
        tasks.set(id, updated);
        await saveTasks(tasks);
        return updated;
    },

    deleteTask: async (id) => {
        if (!tasks.get(id)) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        tasks.delete(id);
        await saveTasks(tasks);
    },
};