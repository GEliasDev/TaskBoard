import { ZodError } from 'zod';
import { AppError } from './appError.js';

// Middleware global para manejar errores
export const errorHandler = (err, _req, res, _next) => {

    // 1. Errores de validación (Zod)
    if (err instanceof ZodError) {

        // Extraigo todos los mensajes de error y los uno en uno solo
        const messages = err.errors
            .map((e) => e.message)
            .join(', ');

        return res.status(400).json({
            success: false,
            message: messages,
        });
    }

    // 2. Errores controlados de la app (AppError)
    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }

    // 3. Errores inesperados
    console.error(err); // Log para debugging

    return res.status(500).json({
        success: false,
        message: 'Internal server error.',
    });
};