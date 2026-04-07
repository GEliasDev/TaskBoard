import { ZodError } from 'zod';
import { AppError } from './appError.js';

export const errorHandler = (err, _req, res, _next) => {
    // Zod validation errors
    if (err instanceof ZodError) {
        const messages = err.errors.map((e) => e.message).join(', ');
        return res.status(400).json({ success: false, message: messages });
    }

    // Known operational errors
    if (err instanceof AppError) {
        return res.status(err.status).json({ success: false, message: err.message });
    }

    // Unknown errors
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
};