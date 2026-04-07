import { useEffect, useRef } from 'react';

// Modal para editar una tarea
export function EditModal({ task, onSave, onClose }) {
    // Referencia al input para poder manipularlo directamente
    const inputRef = useRef(null);

    useEffect(() => {
        // Apenas se abre el modal, enfoco el input automáticamente
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);

    // Manejo de teclas dentro del input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();   // Enter guarda
        if (e.key === 'Escape') onClose();     // Escape cierra
    };

    // Función para guardar cambios
    const handleSave = () => {
        const val = inputRef.current?.value.trim();

        // Si está vacío, no hace nada
        if (!val) return;

        // Llama al callback pasando el id de la tarea y el nuevo título
        onSave(task.id, val);
    };

    return (
        // Overlay: fondo oscuro del modal
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Si haces click fuera del modal (en el overlay), se cierra */}

            <div className="modal">
                <div className="modal-title">Editar tarea</div>

                <input
                    ref={inputRef}
                    className="modal-input"
                    type="text"
                    defaultValue={task.title} // Valor inicial
                    placeholder="Título de la tarea..."
                    onKeyDown={handleKeyDown}
                />

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>

                    <button className="btn-save" onClick={handleSave}>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}


// Modal de confirmación para eliminar
export function ConfirmModal({ title, onConfirm, onClose }) {
    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Igual que el anterior: click afuera cierra */}

            <div className="modal">
                {/* Icono de advertencia */}
                <div className="confirm-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M10 6v5M10 14h.01"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="10"
                            cy="10"
                            r="8.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                        />
                    </svg>
                </div>

                {/* Texto principal */}
                <div className="confirm-title">¿Eliminar tarea?</div>

                {/* Texto secundario con el nombre de la tarea */}
                <div className="confirm-sub">
                    "{title}" será eliminada permanentemente.
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>

                    <button className="btn-delete" onClick={onConfirm}>
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}