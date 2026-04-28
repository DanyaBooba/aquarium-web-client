import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiClient';

export function usePosts({ idUser = null, side = true, category = 'posts', feed = 'feed' } = {}) {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                const accessToken = localStorage.getItem('accessToken') ?? null;

                const url = new URL('/api/posts', process.env.REACT_APP_API_URL);
                if (idUser) url.searchParams.append('idUser', idUser);
                url.searchParams.append('side', side);
                url.searchParams.append('category', category);
                url.searchParams.append('feed', feed);

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
                    throw new Error('Ошибка сервера');
                }

                if (isMounted) {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setPosts(data.posts);
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
    }, [idUser, side, category, feed]);

    return { posts, loading, error };
}
