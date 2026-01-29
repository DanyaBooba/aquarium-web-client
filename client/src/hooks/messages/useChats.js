import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient';

export function useChats() {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await apiFetch('https://mini.aquarium.org.ru/api/chats', {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Ошибка при получении чатов');
                }

                if (data?.success) {
                    setChats(data?.chats);
                    setUserId(data?.userId);
                }
                else {
                    throw new Error('Ошибка при получении чатов');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    return { chats, userId, loading, error };
}
