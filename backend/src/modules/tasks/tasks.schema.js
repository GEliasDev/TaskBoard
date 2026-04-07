import { z } from 'zod';

export const taskCreateSchema = z.object({
    title: z.string({ required_error: 'El título es requerido.' })
        .min(1, { message: 'El título no puede estar vacío.' }),
    status: z.enum(['pending', 'completed']).default('pending'),
});

export const taskUpdateSchema = z.object({
    title: z.string().min(1, { message: 'El título no puede estar vacío.' }).optional(),
    status: z.enum(['pending', 'completed']).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar (title o status).',
});