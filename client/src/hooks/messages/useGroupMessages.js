import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient';

export function useGroupMessages(chatId) {
    const [chat, setChat] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!chatId) {
            setLoading(false);
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await apiFetch(`/api/chats/group/${chatId}/messages`, {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Ошибка при получении сообщений');
                }

                if (data?.success) {
                    setMessages(data?.messages ?? []);
                    setChat(data?.chat ?? null);
                    setCurrentUserId(data?.currentUserId ?? 0);
                } else {
                    throw new Error('Ошибка при получении сообщений');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chatId]);

    return { messages, chat, currentUserId, loading, error };
}
