import { useEffect, useState } from 'react'
import { getCsrfToken } from '../utils/getCsrfToken'
import { useSocket } from '../components/app/SocketProvider';

function MaybeProfileMiddleware({ children }) {
    const socket = useSocket();

    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState(0);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const validateTokens = async () => {

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

                if (data?.status === 'valid' || data?.status === 'unvalid') {
                    setUserId(data?.userId);
                }

                if (data.status === "unvalid" && data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                }

                if (data.status === "deleted") {
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {

            } finally {
                setChecked(true);
            }
        }

        validateTokens();
    }, [])

    useEffect(() => {
        if (checked && userId) {
            socket.emit('join_room', userId);
        }
    }, [checked]);

    if (!checked) return null;

    return children;
}

export default MaybeProfileMiddleware
