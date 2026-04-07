import TaskItem from './TaskItem';

const EMPTY_MESSAGES = {
    all:       'No hay tareas aún. ¡Agrega una arriba!',
    pending:   '¡Sin pendientes! Buen trabajo.',
    completed: 'Aún no has completado ninguna tarea.',
};

function EmptyState({ filter }) {
    return (
        <div className="empty">
            <div className="empty-icon">
                {filter === 'completed' ? (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M9 14.5l3.5 3.5 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".4"/>
                    </svg>
                ) : filter === 'pending' ? (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M14 9v5.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".4"/>
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect x="5" y="7" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
                        <path d="M9 12h10M9 16h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".4"/>
                    </svg>
                )}
            </div>
            <p className="empty-text">{EMPTY_MESSAGES[filter]}</p>
        </div>
    );
}

function SectionHeader({ label, count }) {
    return (
        <div className="section-header">
            <span className="section-title">{label}</span>
            <span className="section-line" />
            <span className="section-count">{count}</span>
        </div>
    );
}

export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
    if (tasks.length === 0) return <EmptyState filter={filter} />;

    const itemProps = { onToggle, onEdit, onDelete };

    if (filter !== 'all') {
        return (
            <div className="task-list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} {...itemProps} />
                ))}
            </div>
        );
    }

    const pending   = tasks.filter((t) => t.status === 'pending');
    const completed = tasks.filter((t) => t.status === 'completed');

    return (
        <div>
            {pending.length > 0 && (
                <section className="task-section">
                    <SectionHeader label="Pendientes" count={pending.length} />
                    <div className="task-list">
                        {pending.map((task) => (
                            <TaskItem key={task.id} task={task} {...itemProps} />
                        ))}
                    </div>
                </section>
            )}
            {completed.length > 0 && (
                <section className="task-section">
                    <SectionHeader label="Completadas" count={completed.length} />
                    <div className="task-list">
                        {completed.map((task) => (
                            <TaskItem key={task.id} task={task} {...itemProps} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}