import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient'

export function useNotifications() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await apiFetch('/api/profile/notifications', {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    throw new Error(data.error || 'Ошибка получения уведомлений');
                }

                setNotifications(data?.notifications ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return { notifications, loading, error };
}
