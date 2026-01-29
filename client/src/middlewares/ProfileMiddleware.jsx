import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCsrfToken } from '../utils/getCsrfToken'
import { useSocket } from '../components/app/SocketProvider';

export default function ProfileMiddleware({ children }) {
    const socket = useSocket();

    const [isValid, setIsValid] = useState(null);
    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const validateTokens = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                localStorage.removeItem('accessToken');
                setIsValid(false);
                return;
            }

            try {
                const csrf = await getCsrfToken();
                const response = await fetch('https://mini.aquarium.org.ru/api/auth/check', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'X-CSRF-Token': csrf,
                    },
                });

                const data = await response.json();

                if (data.status === "unvalid" && data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                }

                if (data.status === "deleted") {
                    localStorage.removeItem('accessToken');
                    throw new Error('refresh токен удален');
                }

                setIsValid(true);
                setUserId(data?.userId);
            } catch (error) {
                setIsValid(false);
            }
            finally {
                setChecked(true);
            }
        }

        validateTokens();
    }, [])

    useEffect(() => {
        if (checked && socket) {
            socket.emit('join_room', userId);
        }
    }, [checked, socket])

    if (isValid === null) {
        return null;
    }

    if (!isValid) {
        return <Navigate to="/" replace />
    }

    return children;
}
