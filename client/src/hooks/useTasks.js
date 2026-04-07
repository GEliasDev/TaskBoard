import { useState, useEffect } from 'react';
import { taskApi } from '../services/taskApi';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga las tareas al montar el componente
    const fetchTasks = async () => {
        try {
            const data = await taskApi.getAll();
            setTasks(data);
        } catch {
            setError('No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Crear una nueva tarea
    const createTask = async (title) => {
        const newTask = await taskApi.create(title);
        setTasks(prev => [...prev, newTask]);
        return newTask;
    };

    // Cambiar entre pendiente y completada
    const toggleTask = async (id, currentStatus) => {
        const updated = await taskApi.toggle(id, currentStatus);
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
    };

    // Actualizar el título de una tarea
    const updateTitle = async (id, newTitle) => {
        const updated = await taskApi.updateTitle(id, newTitle);
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
        return updated;
    };

    // Eliminar una tarea
    const deleteTask = async (id) => {
        await taskApi.delete(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    return {
        tasks,
        loading,
        error,
        createTask,
        toggleTask,
        updateTitle,
        deleteTask,
        fetchTasks
    };
};