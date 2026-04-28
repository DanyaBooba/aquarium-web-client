import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { apiFetch } from '../../utils/apiClient';
import { useAuth } from '../../hooks/auth/useAuth';

const NotificationContext = createContext(null);

export function NotificationProvider() {
    const location = useLocation();
    const { isAuth } = useAuth();
    const [countNotifications, setCountNotifications] = useState(null);

    useEffect(() => {
        const fetchCountNotifications = async () => {
            if (!isAuth) return;

            if (location.pathname.includes('notification')) {
                setCountNotifications(0);
                return;
            }

            try {
                const response = await apiFetch('/api/profile/notifications/count', {
                    method: 'GET'
                });

                const data = await response.json();

                if (!response.ok || data.error) {
                    throw new Error(data.error || 'Ошибка получения уведомлений');
                }

                setCountNotifications(parseInt(data?.countUnreaded ?? 0) ?? 0);
            } catch (err) { }
        };

        fetchCountNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={countNotifications}>
            <Outlet />
        </NotificationContext.Provider>
    );
}

export const useCountNotifications = () => useContext(NotificationContext);
