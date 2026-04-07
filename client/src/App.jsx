import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { EditModal, ConfirmModal } from './components/Modal';
import Toast from './components/Toast';
import './App.css';

const API = 'http://localhost:3000/api/tasks';

const TOPBAR_TITLES = {
    all:       'Todas las tareas',
    pending:   'Pendientes',
    completed: 'Completadas',
};

export default function App() {
    const [tasks, setTasks]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);
    const [filter, setFilter]   = useState('all');

    const [editTask, setEditTask]       = useState(null);
    const [deleteTask, setDeleteTask]   = useState(null);
    const [toast, setToast]             = useState(null);

    const showToast = (msg) => setToast(msg);

    const fetchTasks = async () => {
        try {
            const res  = await fetch(API);
            const json = await res.json();
            setTasks(json.data);
        } catch {
            setError('No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const createTask = async (title) => {
        const res  = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        const json = await res.json();
        setTasks((prev) => [...prev, json.data]);
        showToast('Tarea agregada');
    };

    const toggleTask = async (id, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        const res  = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        const json = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === id ? json.data : t)));
    };

    const handleEditOpen = (id, title) => {
        setEditTask({ id, title });
    };

    const handleEditSave = async (id, newTitle) => {
        const res  = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle }),
        });
        const json = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === id ? json.data : t)));
        setEditTask(null);
        showToast('Tarea actualizada');
    };

    const handleDeleteOpen = (id, title) => {
        setDeleteTask({ id, title });
    };

    const handleDeleteConfirm = async () => {
        const { id } = deleteTask;
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setDeleteTask(null);
        showToast('Tarea eliminada');
    };

    const counts = {
        all:       tasks.length,
        pending:   tasks.filter((t) => t.status === 'pending').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
    };

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter((t) => t.status === filter);

    const pct = counts.all > 0 ? Math.round((counts.completed / counts.all) * 100) : 0;

    return (
        <div className="layout">
            <Sidebar filter={filter} onFilter={setFilter} counts={counts} />

            <div className="content">
                <header>
                    <div className="topbar">
                        <div className="topbar-left">
                            <h1 className="topbar-title">{TOPBAR_TITLES[filter]}</h1>
                            <span className="topbar-count">{filteredTasks.length} tareas</span>
                        </div>
                        <div className="metrics">
                            <div className="metric">
                                <span className="metric-value">{counts.all}</span>
                                <span className="metric-label">Total</span>
                            </div>
                            <div className="metric metric--pending">
                                <span className="metric-value">{counts.pending}</span>
                                <span className="metric-label">Pendientes</span>
                            </div>
                            <div className="metric metric--done">
                                <span className="metric-value">{counts.completed}</span>
                                <span className="metric-label">Listas</span>
                            </div>
                            <div className="metric metric--progress">
                                <span className="metric-value">{pct}%</span>
                                <span className="metric-label">Progreso</span>
                            </div>
                        </div>
                    </div>
                    <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                </header>

                <main className="main">
                    <TaskForm onCreate={createTask} />

                    {loading && <p className="feedback">Cargando tareas...</p>}
                    {error   && <p className="feedback feedback--error">{error}</p>}

                    {!loading && !error && (
                        <TaskList
                            tasks={filteredTasks}
                            filter={filter}
                            onToggle={toggleTask}
                            onEdit={handleEditOpen}
                            onDelete={handleDeleteOpen}
                        />
                    )}
                </main>
            </div>

            {editTask && (
                <EditModal
                    task={editTask}
                    onSave={handleEditSave}
                    onClose={() => setEditTask(null)}
                />
            )}

            {deleteTask && (
                <ConfirmModal
                    title={deleteTask.title}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setDeleteTask(null)}
                />
            )}

            {toast && (
                <Toast message={toast} onDone={() => setToast(null)} />
            )}
        </div>
    );
}