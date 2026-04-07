import { useState } from 'react';

// Formulario para crear nuevas tareas
export default function TaskForm({ onCreate }) {

    // Estado del input (lo que escribe el usuario)
    const [title, setTitle] = useState('');

    // Estado para manejar loading mientras se crea la tarea
    const [loading, setLoading] = useState(false);

    // Manejo del submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita recargar la página

        // Si está vacío (o solo espacios), no hace nada
        if (!title.trim()) return;

        setLoading(true);

        // Llama a la función que crea la tarea (viene por props)
        await onCreate(title.trim());

        // Limpio el input después de crear
        setTitle('');

        setLoading(false);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            {/* Input controlado */}
            <input
                className="task-input"
                type="text"
                placeholder="Añadir nueva tarea..."
                value={title}

                // Actualizo el estado en cada cambio
                onChange={(e) => setTitle(e.target.value)}

                // Deshabilito mientras está cargando
                disabled={loading}
                autoComplete="off"
            />

            <div className="task-form-divider" />

            {/* Botón de envío */}
            <button
                className="btn btn--primary"
                type="submit"

                // Deshabilitado si está cargando o vacío
                disabled={loading || !title.trim()}
            >
                {/* Icono "+" */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path 
                        d="M7 1v12M1 7h12" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                    />
                </svg>

                {/* Texto dinámico */}
                {loading ? 'Agregando...' : 'Agregar'}
            </button>
        </form>
    );
}