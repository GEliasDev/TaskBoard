import { ZodError } from 'zod';
import { AppError } from './appError.js';

export const errorHandler = (err, _req, res, _next) => {
    // Errores de validación de Zod
    if (err instanceof ZodError) {
        const messages = err.errors.map((e) => e.message).join(', ');
        return res.status(400).json({ success: false, message: messages });
    }

    // Errores operacionales conocidos
    if (err instanceof AppError) {
        return res.status(err.status).json({ success: false, message: err.message });
    }

    // En el caso de errores desconocidos enviará Internal Server Error
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
};