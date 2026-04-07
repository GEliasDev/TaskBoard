const API = 'http://localhost:3000/api/tasks';

export const taskApi = {
    getAll: async () => {
        const res = await fetch(API);
        const json = await res.json();
        return json.data;
    },

    create: async (title) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        const json = await res.json();
        return json.data;
    },

    toggle: async (id, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        const json = await res.json();
        return json.data;
    },

    updateTitle: async (id, newTitle) => {
        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle }),
        });
        const json = await res.json();
        return json.data;
    },

    delete: async (id) => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
    },
};