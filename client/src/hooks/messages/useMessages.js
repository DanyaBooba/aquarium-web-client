import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient';

export function useMessages(userId) {
    const [chatId, setChatId] = useState(0);
    const [user, setUser] = useState({});
    const [currentUserId, setCurrentUserId] = useState(0);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await apiFetch(`/api/messages/${userId}`, {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Ошибка при получении сообщений');
                }

                if (data?.success) {
                    setMessages(data?.messages ?? []);
                    setUser(data?.user ?? {});
                    setChatId(data?.chatId ?? 0);
                    setCurrentUserId(data?.currentUserId ?? 0);
                }
                else {
                    throw new Error('Ошибка при получении сообщений');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [userId]);

    return { messages, user, chatId, currentUserId, loading, error };
}
