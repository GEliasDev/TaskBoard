import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import taskRoutes from './src/modules/tasks/tasks.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        app.listen(PORT, () => console.log(`TaskBoard funcionando correctamente en puerto ${PORT}`));
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
})();