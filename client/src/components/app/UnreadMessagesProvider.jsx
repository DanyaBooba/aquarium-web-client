import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { apiFetch } from '../../utils/apiClient';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSocket } from './SocketProvider';

const UnreadMessagesContext = createContext(0);

export function UnreadMessagesProvider() {
    const { isAuth } = useAuth();
    const location = useLocation();
    const socket = useSocket();
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchCount = async () => {
        if (!isAuth) return;
        try {
            const res = await apiFetch('/api/chats/unread-count', { method: 'GET' });
            const data = await res.json();
            setUnreadCount(parseInt(data?.unreadCount ?? 0));
        } catch { }
    };

    useEffect(() => {
        fetchCount();
    }, [isAuth]);

    // Обнуляем счётчик когда пользователь заходит в /messages или /chat
    useEffect(() => {
        if (location.pathname.startsWith('/messages') || location.pathname.startsWith('/chat')) {
            fetchCount();
        }
    }, [location.pathname]);

    // Слушаем socket-события
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = () => {
            setUnreadCount(prev => prev + 1);
        };

        const handleMessagesRead = () => {
            fetchCount();
        };

        const handleUpdateUnread = () => {
            fetchCount();
        };

        socket.on('new_message', handleNewMessage);
        socket.on('messages_read', handleMessagesRead);
        socket.on('update_unread_count', handleUpdateUnread);

        return () => {
            socket.off('new_message', handleNewMessage);
            socket.off('messages_read', handleMessagesRead);
            socket.off('update_unread_count', handleUpdateUnread);
        };
    }, [socket]);

    return (
        <UnreadMessagesContext.Provider value={unreadCount}>
            <Outlet />
        </UnreadMessagesContext.Provider>
    );
}

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
