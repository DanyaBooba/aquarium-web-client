import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io({
            withCredentials: true,
            transports: ['polling', 'websocket'],
        });

        newSocket.on('connect', () => {
            console.log('socket connected', newSocket.id);
        });

        newSocket.on('connect_error', (err) => {
            // console.error('socket connection error', err);
        });

        newSocket.on('disconnect', () => {
            // console.log('socket disconnected');
        });

        setSocket(newSocket);

        return () => {
            // console.log('cleaning up socket');
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <Outlet />
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
