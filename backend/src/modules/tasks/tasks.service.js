import { randomUUID } from 'crypto';
import { taskCreateSchema, taskUpdateSchema } from './tasks.schema.js';
import { AppError } from '../../middlewares/appError.js';

// "base de datos" en memoria
const tasks = new Map();

tasks.set(randomUUID(), { id: randomUUID(), title: 'Configurar el proyecto', status: 'completed', createdAt: new Date().toISOString() });
tasks.set(randomUUID(), { id: randomUUID(), title: 'Construir el backend', status: 'pending', createdAt: new Date().toISOString() });

export const TaskService = {
    getAllTasks: () => Array.from(tasks.values()),

    getTaskById: (id) => {
        const task = tasks.get(id);
        if (!task) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        return task;
    },

    createTask: (data) => {
        const parsed = taskCreateSchema.parse(data);
        const task = { id: randomUUID(), ...parsed, createdAt: new Date().toISOString() };
        tasks.set(task.id, task);
        return task;
    },

    updateTask: (id, data) => {
        const task = tasks.get(id);
        if (!task) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        const parsed = taskUpdateSchema.parse(data);
        const updated = { ...task, ...parsed, updatedAt: new Date().toISOString() };
        tasks.set(id, updated);
        return updated;
    },

    completeTask: (id) => {
        const task = tasks.get(id);
        if (!task) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        const updated = { ...task, status: 'completed', updatedAt: new Date().toISOString() };
        tasks.set(id, updated);
        return updated;
    },

    deleteTask: (id) => {
        if (!tasks.get(id)) throw new AppError(`Tarea con id "${id}" no encontrada.`, 404);
        tasks.delete(id);
    },
};