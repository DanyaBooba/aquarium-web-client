import { checkAuth, resetAuthCache } from './authCheck';

const BASE_URL = process.env.REACT_APP_API_URL;

async function refreshAccessToken() {
    try {
        const data = await checkAuth();

        if (data?.status === 'deleted') {
            throw new Error('refresh токен удален');
        }

        // Возвращаем актуальный токен из localStorage
        // (checkAuth уже обновил его если был 'unvalid')
        return localStorage.getItem('accessToken');
    } catch (error) {
        resetAuthCache();
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
    const fetchUrl = url?.toString()?.toLowerCase()?.includes('http') ? url : `${BASE_URL}${url}`;

    let accessToken = localStorage.getItem('accessToken');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(fetchUrl, {
        ...options,
        headers,
        credentials: 'include'
    });

    if (response.status === 401 || response.status === 403) {
        accessToken = await refreshAccessToken();

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(fetchUrl, {
                ...options,
                headers,
                credentials: 'include'
            });
        }
    }

    return response;
};
