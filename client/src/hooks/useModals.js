import { useState } from 'react';

export const useModals = () => {
    // Estado para el modal de edición
    const [editTask, setEditTask] = useState(null);
    
    // Estado para el modal de confirmación de borrado
    const [deleteTask, setDeleteTask] = useState(null);
    
    // Estado para mostrar notificaciones temporales (toast)
    const [toast, setToast] = useState(null);

    // Función para mostrar un mensaje toast
    const showToast = (msg) => setToast(msg);

    return {
        editTask,
        setEditTask,
        deleteTask,
        setDeleteTask,
        toast,
        setToast,
        showToast
    };
};