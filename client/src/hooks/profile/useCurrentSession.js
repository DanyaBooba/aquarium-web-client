import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient'

export function useCurrentSession() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [canCancel, setCanCancel] = useState(false);
    const [currentSession, setCurrentSession] = useState({});

    useEffect(() => {
        const fetchCurrentSession = async () => {
            try {
                const response = await apiFetch('/api/user/token', {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    throw new Error(data.error || 'Ошибка получения токена');
                }

                setCanCancel(data?.canCancel);
                setCurrentSession(data?.currentSession);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentSession();
    }, []);

    return { canCancel, currentSession, loading, error };
}
