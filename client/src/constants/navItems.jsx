 // Este archivo define las opciones de navegación del sidebar
// Básicamente es una constante con la configuración de cada vista

export const NAV_ITEMS = [
    {
        // Identificador único (se usa para lógica, filtros, etc.)
        key: 'all',

        // Texto que se muestra en el sidebar
        label: 'Todas las tareas',

        // Icono (SVG inline, así no dependes de librerías externas)
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="8" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="8" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
        ),
    },
    {
        key: 'pending',
        label: 'Pendientes',
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                {/* Icono tipo reloj → representa tareas pendientes */}
                <path 
                    d="M7 4.5v3l1.5 1.5" 
                    stroke="currentColor" 
                    strokeWidth="1.3" 
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        key: 'completed',
        label: 'Completadas',
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                {/* Check → representa tareas completadas */}
                <path 
                    d="M4.5 7l2 2 3-3" 
                    stroke="currentColor" 
                    strokeWidth="1.3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];