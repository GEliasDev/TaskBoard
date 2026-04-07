import { useEffect, useState } from 'react';

// Este componente es un Toast (una notificación que aparece y desaparece sola)
export default function Toast({ message, onDone }) {
    // Estado para saber si el toast está visible
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Este timer controla cuánto dura el toast en pantalla
        const t = setTimeout(() => {
            setVisible(false);

            // Luego esperamos 300ms para que la animación termine
            setTimeout(onDone, 300);
        }, 2400); // Dura 2.4 segundos visible

        // Limpieza del efecto por si el componente se desmonta antes
        return () => clearTimeout(t);
    }, [onDone]);

    // Si ya no es visible, no renderiza nada
    if (!visible) return null;

    return (
        <div className="toast">
            {/* Este es solo un detalle visual (el puntico del toast) */}
            <div className="toast-dot" />

            {/* Aquí se muestra el mensaje */}
            <span>{message}</span>
        </div>
    );
}