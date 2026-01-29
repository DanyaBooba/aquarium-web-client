import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePost(idUser, idPost) {
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = new URL('https://mini.aquarium.org.ru/api/post', window.location.origin);
                url.searchParams.append('idUser', idUser);
                url.searchParams.append('idPost', idPost);

                const accessToken = localStorage.getItem('accessToken') ?? null;

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.status === 'notFound') {
                    if (!accessToken) navigate('/auth', { replace: true });
                    throw new Error('Запись не найдена');
                }

                if (!response.ok) {
                    if (!accessToken) navigate('/auth', { replace: true });
                    throw new Error('Ошибка сервера');
                }

                if (isMounted) {
                    if (data.error) {
                        if (!accessToken) navigate('/auth', { replace: true });
                        throw new Error(data.error);
                    }
                    setPost(data.post);
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

        fetchPost();

        return () => {
            isMounted = false;
        };
    }, [idUser, idPost, navigate]);

    return { post, user, loading, error };
}
