import TaskItem from './TaskItem';

// Mensajes cuando no hay tareas según el filtro
const EMPTY_MESSAGES = {
    all:       'No hay tareas aún. ¡Agrega una arriba!',
    pending:   '¡Sin pendientes! Buen trabajo.',
    completed: 'Aún no has completado ninguna tarea.',
};

// Componente para estado vacío (cuando no hay tareas)
function EmptyState({ filter }) {
    return (
        <div className="empty">
            <div className="empty-icon">

                {/* Cambio el icono dependiendo del filtro */}
                {filter === 'completed' ? (
                    // Icono de completadas (check)
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M9 14.5l3.5 3.5 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".4"/>
                    </svg>

                ) : filter === 'pending' ? (
                    // Icono de pendientes (tipo reloj)
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M14 9v5.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".4"/>
                    </svg>

                ) : (
                    // Icono general
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect x="5" y="7" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M9 12h10M9 16h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".4"/>
                    </svg>
                )}
            </div>

            {/* Mensaje según el filtro */}
            <p className="empty-text">{EMPTY_MESSAGES[filter]}</p>
        </div>
    );
}

// Header de cada sección (ej: Pendientes / Completadas)
function SectionHeader({ label, count }) {
    return (
        <div className="section-header">
            <span className="section-title">{label}</span>
            <span className="section-line" />
            <span className="section-count">{count}</span>
        </div>
    );
}

// Lista principal de tareas
export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {

    // Si no hay tareas, muestro estado vacío
    if (tasks.length === 0) return <EmptyState filter={filter} />;

    // Props comunes que le paso a cada TaskItem
    const itemProps = { onToggle, onEdit, onDelete };

    // Si no estoy en "all", simplemente renderizo la lista normal
    if (filter !== 'all') {
        return (
            <div className="task-list">
                {tasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        {...itemProps} 
                    />
                ))}
            </div>
        );
    }

    // Si estoy en "all", separo las tareas en pendientes y completadas
    const pending   = tasks.filter((t) => t.status === 'pending');
    const completed = tasks.filter((t) => t.status === 'completed');

    return (
        <div>
            {/* Sección de pendientes */}
            {pending.length > 0 && (
                <section className="task-section">
                    <SectionHeader 
                        label="Pendientes" 
                        count={pending.length} 
                    />

                    <div className="task-list">
                        {pending.map((task) => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                {...itemProps} 
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Sección de completadas */}
            {completed.length > 0 && (
                <section className="task-section">
                    <SectionHeader 
                        label="Completadas" 
                        count={completed.length} 
                    />

                    <div className="task-list">
                        {completed.map((task) => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                {...itemProps} 
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}