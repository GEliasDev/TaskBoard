import dotenv from 'dotenv';
dotenv.config(); // Carga variables de entorno desde .env

import express from 'express';
import cors from 'cors';

// Rutas del módulo de tareas
import taskRoutes from './src/modules/tasks/tasks.routes.js';

// Middleware global de manejo de errores
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

// Middleware para permitir peticiones desde el frontend (CORS)
app.use(cors());

// Middleware para parsear JSON en las requests
app.use(express.json());

// Endpoint simple para verificar que el servidor está vivo
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Todas las rutas de tareas van bajo /api/tasks
app.use('/api/tasks', taskRoutes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Función autoejecutable para iniciar el servidor
(async () => {
    try {
        app.listen(PORT, () => 
            console.log(`TaskBoard funcionando correctamente en puerto ${PORT}`)
        );
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);

        // Si falla algo crítico, cierra el proceso
        process.exit(1);
    }
})();