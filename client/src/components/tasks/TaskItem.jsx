export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
    // Verifico si la tarea está completada
    const isCompleted = task.status === 'completed';

    return (
        <div className={`task-item ${isCompleted ? 'task-item--completed' : ''}`}>
            
            {/* Botón para marcar como completada / pendiente */}
            <button
                className={`task-check ${isCompleted ? 'task-check--done' : ''}`}
                
                // Cambio el estado de la tarea
                onClick={() => onToggle(task.id, task.status)}

                // Tooltips y accesibilidad
                title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            >
                {/* Si está completada, muestro el check */}
                {isCompleted && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path 
                            d="M1.5 5l2.5 2.5 4.5-4" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>

            {/* Título de la tarea (click para editar) */}
            <span
                className="task-title"
                onClick={() => onEdit(task.id, task.title)}
                title="Haz clic para editar"
            >
                {task.title}
            </span>

            {/* Fecha de creación (si existe) */}
            {task.createdAt && (
                <span className="task-date">
                    {
                        // Formateo la fecha en formato corto en español
                        new Date(task.createdAt).toLocaleDateString('es-CO', {
                            day: 'numeric',
                            month: 'short'
                        })
                    }
                </span>
            )}

            {/* Acciones (editar / eliminar) */}
            <div className="task-actions">

                {/* Botón editar */}
                <button
                    className="task-action task-action--edit"
                    onClick={() => onEdit(task.id, task.title)}
                    aria-label="Editar tarea"
                    title="Editar"
                >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path 
                            d="M8 2.5l2.5 2.5-6.5 6.5H1.5v-2.5L8 2.5z" 
                            stroke="currentColor" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Botón eliminar */}
                <button
                    className="task-action task-action--delete"
                    onClick={() => onDelete(task.id, task.title)}
                    aria-label="Eliminar tarea"
                    title="Eliminar"
                >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path 
                            d="M2 3.5h9M4.5 3.5V2.5h4v1M5.5 6v4M7.5 6v4M3.5 3.5l.5 7h5.5l.5-7" 
                            stroke="currentColor" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}