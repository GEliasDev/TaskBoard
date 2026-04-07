const API = 'http://localhost:3000/api/tasks';

// Este archivo centraliza todas las llamadas al backend
// Básicamente es una capa para no hacer fetch directo en los componentes

export const taskApi = {

    // Obtener todas las tareas
    getAll: async () => {
        const res = await fetch(API);
        const json = await res.json();

        // Devuelvo solo la data para simplificar el consumo
        return json.data;
    },

    // Crear una nueva tarea
    create: async (title) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            // Envío el título en el body
            body: JSON.stringify({ title }),
        });

        const json = await res.json();
        return json.data;
    },

    // Cambiar estado
    toggle: async (id, currentStatus) => {

        // Calculo el nuevo estado basado en el actual
        const newStatus = currentStatus === 'completed' 
            ? 'pending' 
            : 'completed';

        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },

            // Solo actualizo el status
            body: JSON.stringify({ status: newStatus }),
        });

        const json = await res.json();
        return json.data;
    },

    // Actualizar el título de una tarea
    updateTitle: async (id, newTitle) => {
        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },

            // Envío el nuevo título
            body: JSON.stringify({ title: newTitle }),
        });

        const json = await res.json();
        return json.data;
    },

    // Eliminar una tarea
    delete: async (id) => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
    },
};