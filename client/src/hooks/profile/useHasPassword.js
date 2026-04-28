import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient'

export function useHasPassword() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [hasPassword, setHasPassword] = useState(false);

    useEffect(() => {
        const fetchHasPassword = async () => {
            try {
                const response = await apiFetch('/api/profile/hasPassword', {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    throw new Error(data.error || 'Ошибка получения пароля');
                }

                setHasPassword(data?.hasPassword);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHasPassword();
    }, []);

    return { hasPassword, loading, error };
}
