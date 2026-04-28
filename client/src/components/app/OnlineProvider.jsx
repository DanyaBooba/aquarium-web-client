import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';
import { apiFetch } from '../../utils/apiClient';

const OnlineContext = createContext(new Set());

export function OnlineProvider({ children }) {
    const socket = useSocket();
    const [onlineIds, setOnlineIds] = useState(new Set());

    useEffect(() => {
        apiFetch('/api/users/online')
            .then(r => r.json())
            .then(ids => setOnlineIds(new Set(ids.map(String))))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!socket) return;
        const handleStatus = ({ userId, isOnline }) => {
            setOnlineIds(prev => {
                const next = new Set(prev);
                if (isOnline) next.add(String(userId));
                else next.delete(String(userId));
                return next;
            });
        };
        socket.on('user_status', handleStatus);
        return () => socket.off('user_status', handleStatus);
    }, [socket]);

    return (
        <OnlineContext.Provider value={onlineIds}>
            {children}
        </OnlineContext.Provider>
    );
}

export const useIsOnline = (userId) => {
    const onlineIds = useContext(OnlineContext);
    if (!userId) return false;
    return onlineIds.has(String(userId));
};
