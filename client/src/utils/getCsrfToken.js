import { apiFetch } from "./apiClient";

export const getCsrfToken = async () => {
    const response = await apiFetch('/api/auth/csrf', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Ошибка при получении CSRF токена');
    }

    const { csrfToken } = await response.json();
    return csrfToken;
};
