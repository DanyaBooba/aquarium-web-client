import { apiFetch } from '../../utils/apiClient';

export function useDeletePost() {
    return async (globalId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) throw new Error('Требуется авторизация');

            const res = await apiFetch(`/api/post?id=${globalId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) throw new Error('Ошибка при удалении поста');
            window.location.href = '/profile';
        } catch (err) {
            console.error(err.message);
        }
    };
}
