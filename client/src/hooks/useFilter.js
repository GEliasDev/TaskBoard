import { useState, useMemo } from 'react';

export const useFilter = (tasks) => {
    // Estado que guarda el filtro actual: 'all', 'pending' o 'completed'
    const [filter, setFilter] = useState('all');

    // Calcula la cantidad de tareas en cada categoría
    const counts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    }), [tasks]);

    // Filtra las tareas según el filtro seleccionado
    // (useMemo para mejorar el rendimiento)
    const filteredTasks = useMemo(() => 
        filter === 'all' 
            ? tasks 
            : tasks.filter(t => t.status === filter),
    [tasks, filter]);

    // Calcula el porcentaje de progreso (tareas completadas)
    const pct = counts.all > 0 
        ? Math.round((counts.completed / counts.all) * 100) 
        : 0;

    // Devuelvo todo lo que otros componentes necesitan
    return { 
        filter, 
        setFilter, 
        counts, 
        filteredTasks, 
        pct 
    };
};