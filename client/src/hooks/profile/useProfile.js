import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useProfile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Требуется авторизация');
                }

                const response = await fetch('https://mini.aquarium.org.ru/api/profile', {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                const data = await response.json();

                if (data.status === 'notFound') {
                    localStorage.removeItem('accessToken');
                    navigate('/auth', { replace: true });
                }

                if (!response.ok) {
                    throw new Error('Ошибка загрузки профиля');
                }

                if (isMounted) setUser(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    return { user, loading, error };
}
