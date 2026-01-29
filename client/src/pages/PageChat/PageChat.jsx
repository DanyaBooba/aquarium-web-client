import { AppProfile } from '../../components/app/App';
import { useState } from 'react';

import LayoutChat from '../../components/layout/LayoutChat';
import ChatHeader from '../../components/module/Chat/ChatHeader';
import ChatFooter from '../../components/module/Chat/ChatFooter';
import ChatMessages from '../../components/module/Chat/ChatMessages';

import ChatBubble2 from '../../components/module/Chat/Bubble/ChatBubble2';
import { useParams } from 'react-router-dom';
import { useMessages } from '../../hooks/messages/useMessages';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/joy';
import ServerError from '../../components/module/ServerError/ServerError';

import { apiSendMessage } from '../../utils/apiSendMessage';
import { useSocket } from '../../components/app/SocketProvider';

function PageChat() {
    const socket = useSocket();
    const { id } = useParams();

    const { messages, user, currentUserId, loading, error } = useMessages(id);
    const [showMessages, setShowMessages] = useState();
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        setShowMessages(messages);
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        await apiSendMessage(id, newMessage);

        setShowMessages(prev => [
            ...prev,
            {
                fromMe: true,
                content: newMessage.trim(),
                created_at: new Date()
            },
        ]);
        setNewMessage('');
    };

    const getUserName = () => {
        return user?.firstName ? user?.firstName : 'пользователем'
    }

    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (payload) => {
            if (parseInt(payload.senderId) === parseInt(id)) {
                setShowMessages((prev) => [
                    ...prev,
                    {
                        fromMe: false,
                        content: payload.content,
                        created_at: payload.created_at,
                        checkStatus: 1
                    },
                ]);
            }
        };

        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [socket, id]);

    return (
        <AppProfile title={`Чат с ${getUserName()}`} desc={`Переписка с ${getUserName()} в социальной сети Аквариум мини`} nonav>
            <LayoutChat>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError title="Ошибка при получении сообщений" />
                ) : messages && user && currentUserId ? (
                    <>
                        <ChatHeader
                            user={user ?? {}}
                            currentUserId={currentUserId ?? 0}
                        />

                        <ChatMessages
                            messages={showMessages}
                            Bubble={ChatBubble2}
                        />
                    </>
                ) : null}

                <ChatFooter
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    sendMessage={sendMessage}
                />
            </LayoutChat>
        </AppProfile>
    );
}

export default PageChat;
