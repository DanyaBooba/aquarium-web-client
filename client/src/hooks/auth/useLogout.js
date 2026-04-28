import { useCallback } from 'react';
import { apiFetch } from '../../utils/apiClient';
import { resetAuthCache } from '../../utils/authCheck';

export function useLogout() {
    return useCallback(async () => {
        try {
            const response = await apiFetch('/api/auth/logout', {
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
            resetAuthCache();

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            window.location.href = '/';
        } catch (error) {
            window.location.href = '/';
        }
    }, []);
}
