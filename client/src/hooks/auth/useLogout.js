import { useCallback } from 'react';

export function useLogout() {
    return useCallback(async () => {
        try {
            const response = await fetch('https://mini.aquarium.org.ru/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    refreshToken: localStorage.getItem('refreshToken'),
                }),
            });

            localStorage.removeItem('accessToken');

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            window.location.href = '/';
        } catch (error) {
            window.location.href = '/';
        }
    }, []);
}
