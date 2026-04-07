import Sidebar from './components/layout/Sidebar';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import { EditModal, ConfirmModal } from './components/common/Modal';
import Toast from './components/common/Toast';
import { useTasks } from './hooks/useTasks';
import { useModals } from './hooks/useModals';
import { useFilter } from './hooks/useFilter';
import './App.css';

const TOPBAR_TITLES = {
    all: 'Todas las tareas',
    pending: 'Pendientes',
    completed: 'Completadas',
};

export default function App() {
    // Cargo toda la lógica de tareas (crear, editar, eliminar, etc.)
    const { tasks, loading, error, createTask, toggleTask, updateTitle, deleteTask } = useTasks();

    // Hook que maneja el filtro de las de visualización (Todas / Pendientes / Completadas) y los cálculos
    const { filter, setFilter, counts, filteredTasks, pct } = useFilter(tasks);

    // Hook que maneja los modales y notificaciones (editar, borrar y toast)
    const { editTask, setEditTask, deleteTask: deleteTaskState, setDeleteTask, toast, showToast } = useModals();

    // Función que guarda el título editado
    const handleEditSave = async (id, newTitle) => {
        await updateTitle(id, newTitle);
        setEditTask(null);
        showToast('Tarea actualizada');
    };

    // Función pregunta si quiere eliminar la tarea
    const handleDeleteConfirm = async () => {
        await deleteTask(deleteTaskState.id);
        setDeleteTask(null);
        showToast('Tarea eliminada');
    };

    return (
        <div className="layout">
            <Sidebar 
                filter={filter} 
                onFilter={setFilter} 
                counts={counts} 
            />

            <div className="content">
                <header>
                    <div className="topbar">
                        <div className="topbar-left">
                            <h1 className="topbar-title">{TOPBAR_TITLES[filter]}</h1>
                            <span className="topbar-count">{filteredTasks.length} tareas</span>
                        </div>

                        {/* Tarjetas de Total, Pendientes, Listas y Progreso */}
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

                    {/* Barra de progreso general */}
                    <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                </header>

                <main className="main">
                    {/* Formulario para crear nueva tarea */}
                    <TaskForm onCreate={createTask} />

                    {loading && <p className="feedback">Cargando tareas...</p>}
                    {error && <p className="feedback feedback--error">{error}</p>}

                    {/* Lista de tareas */}
                    {!loading && !error && (
                        <TaskList
                            tasks={filteredTasks}
                            filter={filter}
                            onToggle={toggleTask}
                            onEdit={(id, title) => setEditTask({ id, title })}
                            onDelete={(id, title) => setDeleteTask({ id, title })}
                        />
                    )}
                </main>
            </div>

            {/* Modales */}
            {editTask && <EditModal task={editTask} onSave={handleEditSave} onClose={() => setEditTask(null)} />}
            {deleteTaskState && <ConfirmModal title={deleteTaskState.title} onConfirm={handleDeleteConfirm} onClose={() => setDeleteTask(null)} />}
            
            {/* Notificación flotante */}
            {toast && <Toast message={toast} onDone={() => setToast(null)} />}
        </div>
    );
}