import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { checkAuth } from '../utils/authCheck'
import { useSocket } from '../components/app/SocketProvider';

export default function ProfileMiddleware({ children }) {
    const socket = useSocket();

    const [isValid, setIsValid] = useState(null);
    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const validate = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                setIsValid(false);
                setChecked(true);
                return;
            }

            try {
                const data = await checkAuth();

                if (data.status === 'deleted') {
                    setIsValid(false);
                    return;
                }

                setIsValid(true);
                setUserId(data?.userId);
            } catch {
                setIsValid(false);
            } finally {
                setChecked(true);
            }
        }

        validate();
    }, [])

    useEffect(() => {
        if (checked && socket && userId) {
            socket.emit('join_room', userId);
        }
    }, [checked, socket, userId])

    if (isValid === null) return null;
    if (!isValid) return <Navigate to="/" replace />;

    return children;
}
