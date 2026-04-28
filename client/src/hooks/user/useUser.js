import { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/apiClient';

export function useUser({ format = "id", id = 0, username = null }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        if ((format === 'id' && !id) || (format === 'username' && !username)) {
            setError('Не передан id или username');
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const accessToken = localStorage.getItem('accessToken') ?? null;

                const url = new URL('/api/users', process.env.REACT_APP_API_URL);

                // Передаём нужный параметр в query
                if (format === 'id') {
                    url.searchParams.append('id', id);
                } else if (format === 'username') {
                    url.searchParams.append('username', username);
                }

                const response = await apiFetch(url.toString(), {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Ошибка сервера');
                }

                if (isMounted) {
                    setUser(data.user);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, [format, id, username]);

    return { user, loading, error };
}
