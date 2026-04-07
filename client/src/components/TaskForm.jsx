import { useState } from 'react';

export default function TaskForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setLoading(true);
        await onCreate(title.trim());
        setTitle('');
        setLoading(false);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                className="task-input"
                type="text"
                placeholder="Añadir nueva tarea..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                autoComplete="off"
            />
            <div className="task-form-divider" />
            <button
                className="btn btn--primary"
                type="submit"
                disabled={loading || !title.trim()}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {loading ? 'Agregando...' : 'Agregar'}
            </button>
        </form>
    );
}