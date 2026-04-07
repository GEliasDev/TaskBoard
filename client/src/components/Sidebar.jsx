const NAV_ITEMS = [
    {
        key: 'all',
        label: 'Todas las tareas',
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
                <path d="M7 4.5v3l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        key: 'completed',
        label: 'Completadas',
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
];

export default function Sidebar({ filter, onFilter, counts }) {
    const pct = counts.all > 0 ? Math.round((counts.completed / counts.all) * 100) : 0;

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 4h12M3 8.5h8M3 13h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                </div>
                <div>
                    <span className="sidebar-logo-name">TaskBoard</span>
                    <span className="sidebar-logo-version">Workspace</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <span className="sidebar-nav-label">Vistas</span>
                {NAV_ITEMS.map(({ key, label, icon }) => (
                    <button
                        key={key}
                        className={`sidebar-nav-item ${filter === key ? 'sidebar-nav-item--active' : ''}`}
                        onClick={() => onFilter(key)}
                    >
                        <span className="sidebar-nav-icon">{icon}</span>
                        <span className="sidebar-nav-text">{label}</span>
                        <span className="sidebar-nav-badge">{counts[key]}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-divider" />

            {/* Progress */}
            <div className="sidebar-progress">
                <div className="sidebar-progress-header">
                    <span className="sidebar-progress-label">Progreso general</span>
                    <span className="sidebar-progress-pct">{pct}%</span>
                </div>
                <div className="sidebar-progress-track">
                    <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="sidebar-progress-sub">
                    {counts.completed} de {counts.all} tareas completadas
                </div>
            </div>
        </aside>
    );
}