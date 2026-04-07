import { TaskService } from './tasks.service.js';

export const TaskController = {
    getAll: async (req, res, next) => {
        try {
            const tasks = TaskService.getAllTasks();
            res.json({ success: true, data: tasks });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const task = TaskService.getTaskById(req.params.id);
            res.json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const task = TaskService.createTask(req.body);
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const task = TaskService.updateTask(req.params.id, req.body);
            res.json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    complete: async (req, res, next) => {
        try {
            const task = TaskService.completeTask(req.params.id);
            res.json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            TaskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};