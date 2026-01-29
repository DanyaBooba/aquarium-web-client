export const getCsrfToken = async () => {
    const response = await fetch('https://mini.aquarium.org.ru/api/auth/csrf', {
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
