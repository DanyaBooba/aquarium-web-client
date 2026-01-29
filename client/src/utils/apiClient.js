import { getCsrfToken } from "./getCsrfToken";

async function refreshAccessToken() {
    try {
        let accessToken = localStorage.getItem('accessToken');

        const csrf = await getCsrfToken();
        const response = await fetch('https://mini.aquarium.org.ru/api/auth/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include'
        });

        const data = await response.json();

        accessToken = '';

        if (data?.status === 'unvalid' && data?.accessToken) {
            accessToken = data?.accessToken;
            localStorage.setItem('accessToken', accessToken);
        }

        if (data?.status === "deleted") {
            throw new Error('refresh токен удален');
        }

        return accessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth';
        return null;
    }
}

//
// Следует использовать данную функцию только в том случае,
// если запрос может быть выполнен без перезагрузки страницы,
// иначе валидность токенов проверит соответствующий middleware
//
export const apiFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include'
    });

    if (!response.ok) {
        accessToken = await refreshAccessToken();

        // Если обновили удачно, повторяем исходный запрос с новым токеном
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(url, {
                ...options,
                headers,
                credentials: 'include'
            });
        }
    }

    return response;
};
