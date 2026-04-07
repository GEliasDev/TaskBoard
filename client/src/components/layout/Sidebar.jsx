import { NAV_ITEMS } from '../../constants/navItems';

// Sidebar principal de la web
export default function Sidebar({ filter, onFilter, counts }) {

    // Calculo el porcentaje de tareas completadas
    const pct = counts.all > 0 
        ? Math.round((counts.completed / counts.all) * 100) 
        : 0;

    return (
        <aside className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    {/* Icono simple */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path 
                            d="M3 4h12M3 8.5h8M3 13h10" 
                            stroke="#fff" 
                            strokeWidth="1.6" 
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Nombre de la app */}
                <div>
                    <span className="sidebar-logo-name">TaskBoard</span>
                    <span className="sidebar-logo-version">Workspace</span>
                </div>
            </div>

            {/* Navegación */}
            <nav className="sidebar-nav">
                <span className="sidebar-nav-label">Vistas</span>

                {/* Recorro los items definidos en constantes */}
                {NAV_ITEMS.map(({ key, label, icon }) => (
                    <button
                        key={key}

                        // Si el filtro actual coincide, le agrego clase activa
                        className={`sidebar-nav-item ${
                            filter === key ? 'sidebar-nav-item--active' : ''
                        }`}

                        // Cuando hacen click, cambio el filtro
                        onClick={() => onFilter(key)}
                    >
                        <span className="sidebar-nav-icon">{icon}</span>
                        <span className="sidebar-nav-text">{label}</span>

                        {/* Badge con cantidad de tareas por filtro */}
                        <span className="sidebar-nav-badge">
                            {counts[key]}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-divider" />

            {/* Progreso general */}
            <div className="sidebar-progress">

                <div className="sidebar-progress-header">
                    <span className="sidebar-progress-label">
                        Progreso general
                    </span>

                    {/* Porcentaje calculado arriba */}
                    <span className="sidebar-progress-pct">
                        {pct}%
                    </span>
                </div>

                {/* Barra de progreso */}
                <div className="sidebar-progress-track">
                    <div 
                        className="sidebar-progress-fill"
                        // El ancho depende del porcentaje
                        style={{ width: `${pct}%` }}
                    />
                </div>

                {/* Texto resumen */}
                <div className="sidebar-progress-sub">
                    {counts.completed} de {counts.all} tareas completadas
                </div>
            </div>
        </aside>
    );
}