import { useEffect, useState } from 'react';

export function useUsers() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const accessToken = localStorage.getItem('accessToken') ?? null;

                const url = new URL('https://mini.aquarium.org.ru/api/users', window.location.origin);

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Ошибка сервера');
                }

                if (isMounted) {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setUsers(data.users);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    return { users, loading, error };
}
