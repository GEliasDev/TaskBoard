import { useEffect, useState } from 'react';

export default function Toast({ message, onDone }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 300);
        }, 2400);
        return () => clearTimeout(t);
    }, [onDone]);

    if (!visible) return null;

    return (
        <div className="toast">
            <div className="toast-dot" />
            <span>{message}</span>
        </div>
    );
}