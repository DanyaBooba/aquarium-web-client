import { useEffect, useState } from 'react';

export function useCommentsPost(idPost) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idPost) return;

        const controller = new AbortController();

        const fetchComments = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = new URL('https://mini.aquarium.org.ru/api/post/comments', window.location.origin);
                url.searchParams.set('id', idPost);

                const accessToken = localStorage.getItem('accessToken');

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    credentials: 'include',
                    signal: controller.signal,
                    headers: accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : undefined,
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении комментариев');
                }

                const data = await response.json();
                setComments(data?.comments ?? []);
            } catch (err) {
                if (err.name === 'AbortError') return;

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Неизвестная ошибка'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchComments();

        return () => {
            controller.abort();
        };
    }, [idPost]);

    return { comments, loading, error };
}
