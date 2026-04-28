import { useEffect, useState } from 'react'
import { checkAuth } from '../utils/authCheck'
import { useSocket } from '../components/app/SocketProvider';

function MaybeProfileMiddleware({ children }) {
    const socket = useSocket();

    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const validate = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                setChecked(true);
                return;
            }

            try {
                const data = await checkAuth();

                if (data?.status === 'valid' || data?.status === 'unvalid') {
                    setUserId(data?.userId);
                }
            } catch {
                // публичные страницы доступны без авторизации
            } finally {
                setChecked(true);
            }
        }

        validate();
    }, [])

    useEffect(() => {
        if (checked && userId && socket) {
            socket.emit('join_room', userId);
        }
    }, [checked, userId, socket]);

    if (!checked) return null;

    return children;
}

export default MaybeProfileMiddleware
