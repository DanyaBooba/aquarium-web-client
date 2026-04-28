import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSocket } from './SocketProvider';
import CallInterface from '../module/CallInterface/CallInterface';

const CallContext = createContext(null);

export function CallProvider() {
    const socket = useSocket();

    const [activeCall, setActiveCall] = useState(null);
    // activeCall = { targetUser, isIncomingCall, incomingOffer } | null

    const pendingOfferRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        const handleIncomingCall = ({ fromUserId }) => {
            // console.log('Global: call:incoming from', fromUserId);
            pendingOfferRef.current = null;
            setActiveCall({
                targetUser: { id: fromUserId },
                isIncomingCall: true,
                incomingOffer: null,
            });
        };

        const handleOffer = ({ fromUserId, offer }) => {
            // console.log('Global: call:offer from', fromUserId);
            pendingOfferRef.current = offer;
            setActiveCall(prev => {
                // Если звонок уже открыт — просто обновляем offer
                if (prev && String(prev.targetUser.id) === String(fromUserId)) {
                    return { ...prev, incomingOffer: offer };
                }
                // Если offer пришёл раньше call:incoming
                return {
                    targetUser: { id: fromUserId },
                    isIncomingCall: true,
                    incomingOffer: offer,
                };
            });
        };

        const handleEnd = () => {
            pendingOfferRef.current = null;
            setActiveCall(null);
        };

        const handleReconnect = ({ fromUserId }) => {
            pendingOfferRef.current = null;
            setActiveCall({
                targetUser: { id: fromUserId },
                isIncomingCall: true,
                isReconnect: true,
                incomingOffer: null,
            });
        };

        socket.on('call:incoming', handleIncomingCall);
        socket.on('call:offer', handleOffer);
        socket.on('call:end', handleEnd);
        socket.on('call:reconnect', handleReconnect);

        return () => {
            socket.off('call:incoming', handleIncomingCall);
            socket.off('call:offer', handleOffer);
            socket.off('call:end', handleEnd);
            socket.off('call:reconnect', handleReconnect);
        };
    }, [socket]);

    const startCall = (targetUser) => {
        setActiveCall({
            targetUser,
            isIncomingCall: false,
            incomingOffer: null,
        });
    };

    const closeCall = () => {
        pendingOfferRef.current = null;
        setActiveCall(null);
    };

    return (
        <CallContext.Provider value={{ startCall }}>
            <Outlet />

            {activeCall && (
                <CallInterface
                    socket={socket}
                    targetUser={activeCall.targetUser}
                    isIncomingCall={activeCall.isIncomingCall}
                    incomingOfferRef={pendingOfferRef}
                    isReconnect={activeCall.isReconnect ?? false}
                    onClose={closeCall}
                />
            )}
        </CallContext.Provider>
    );
}

export const useCall = () => useContext(CallContext);
