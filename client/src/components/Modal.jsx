import { useEffect, useRef } from 'react';

export function EditModal({ task, onSave, onClose }) {
    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') onClose();
    };

    const handleSave = () => {
        const val = inputRef.current?.value.trim();
        if (!val) return;
        onSave(task.id, val);
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-title">Editar tarea</div>
                <input
                    ref={inputRef}
                    className="modal-input"
                    type="text"
                    defaultValue={task.title}
                    placeholder="Título de la tarea..."
                    onKeyDown={handleKeyDown}
                />
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                    <button className="btn-save" onClick={handleSave}>Guardar cambios</button>
                </div>
            </div>
        </div>
    );
}

export function ConfirmModal({ title, onConfirm, onClose }) {
    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="confirm-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4"/>
                    </svg>
                </div>
                <div className="confirm-title">¿Eliminar tarea?</div>
                <div className="confirm-sub">"{title}" será eliminada permanentemente.</div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                    <button className="btn-delete" onClick={onConfirm}>Sí, eliminar</button>
                </div>
            </div>
        </div>
    );
}