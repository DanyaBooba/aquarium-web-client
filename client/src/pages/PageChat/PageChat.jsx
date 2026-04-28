import { AppProfile } from '../../components/app/App';
import { useState, useEffect, useRef } from 'react';

import LayoutChat from '../../components/layout/LayoutChat';
import ChatHeader from '../../components/module/Chat/ChatHeader';
import ChatFooter from '../../components/module/Chat/ChatFooter';
import ChatMessages from '../../components/module/Chat/ChatMessages';

import ChatBubble2 from '../../components/module/Chat/Bubble/ChatBubble2';
import { useParams } from 'react-router-dom';
import { useMessages } from '../../hooks/messages/useMessages';
import { useGroupMessages } from '../../hooks/messages/useGroupMessages';
import { Box, CircularProgress } from '@mui/joy';
import ServerError from '../../components/module/ServerError/ServerError';

import { apiFetch } from '../../utils/apiClient';
import { apiSendMessage } from '../../utils/apiSendMessage';
import { useSocket } from '../../components/app/SocketProvider';


function PageChat({ isGroup = false }) {
    const [chatAttachments, setChatAttachments] = useState([]);

    const socket = useSocket();
    const { id, chatId } = useParams();

    const regularChat = useMessages(isGroup ? null : id);
    const groupChat = useGroupMessages(isGroup ? chatId : null);

    const { messages, user, currentUserId, loading, error } = isGroup
        ? { messages: groupChat.messages, user: null, currentUserId: groupChat.currentUserId, loading: groupChat.loading, error: groupChat.error }
        : regularChat;

    const groupChatInfo = isGroup ? groupChat.chat : null;

    const [showMessages, setShowMessages] = useState();
    const [newMessage, setNewMessage] = useState('');
    const [isPartnerTyping, setIsPartnerTyping] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const [replyTo, setReplyTo] = useState(null); // { id, content, fromMe, senderUser }

    // Рефы для актуальных значений внутри socket-замыканий
    const currentUserIdRef = useRef(currentUserId);
    const currentChatIdRef = useRef(null);

    useEffect(() => { currentUserIdRef.current = currentUserId; }, [currentUserId]);
    useEffect(() => {
        currentChatIdRef.current = isGroup ? parseInt(chatId) : regularChat?.chatId ?? null;
    }, [isGroup, chatId, regularChat?.chatId]);

    useEffect(() => {
        setShowMessages(messages);
    }, [messages]);

    // Отмечаем сообщения как прочитанные при открытии чата
    useEffect(() => {
        const resolvedChatId = isGroup ? chatId : regularChat?.chatId;
        if (!resolvedChatId) return;
        apiFetch(`/api/chats/${resolvedChatId}/read`, { method: 'POST' }).catch(() => { });
    }, [regularChat?.chatId, chatId, isGroup]);

    const sendMessage = async () => {
        if (!newMessage.trim() && chatAttachments.length === 0) return;

        const localAttachmentPreviews = chatAttachments.map(file => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file',
            name: file.name,
            size: file.size,
            _local: true,
        }));

        const currentReply = replyTo;
        const optimisticMsg = {
            fromMe: true,
            content: newMessage.trim(),
            attachments: localAttachmentPreviews.length > 0 ? localAttachmentPreviews : null,
            created_at: new Date(),
            checkStatus: -1,
            replyPreview: currentReply ? { id: currentReply.id, content: currentReply.content } : null,
        };

        setShowMessages(prev => [...prev, optimisticMsg]);
        setNewMessage('');
        setChatAttachments([]);
        setReplyTo(null);

        const formData = new FormData();
        if (newMessage.trim()) formData.append('content', newMessage.trim());
        for (const file of chatAttachments) formData.append('files', file);
        if (currentReply) formData.append('replyToId', currentReply.id);

        const updateLastOptimistic = (extra = {}) => {
            setShowMessages(prev => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last && last.fromMe && last.checkStatus === -1) {
                    copy[copy.length - 1] = { ...last, checkStatus: 1, ...extra };
                }
                return copy;
            });
        };

        try {
            if (isGroup) {
                const res = await apiFetch(`/api/chats/group/${chatId}/send`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                updateLastOptimistic({
                    ...(data?.attachments ? { attachments: data.attachments, _local: false } : {}),
                    ...(data?.replyPreview ? { replyPreview: data.replyPreview } : {}),
                });
            } else {
                const res = await apiFetch(`/api/messages/${id}/send`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                updateLastOptimistic({
                    ...(data?.attachments ? { attachments: data.attachments, _local: false } : {}),
                    ...(data?.replyPreview ? { replyPreview: data.replyPreview } : {}),
                });
            }
        } catch (e) {
            console.error('Ошибка отправки:', e);
            setShowMessages(prev => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last && last.fromMe && last.checkStatus === -1) {
                    copy[copy.length - 1] = { ...last, checkStatus: -2 };
                }
                return copy;
            });
        }
    };

    const handleTypingEmit = (isTyping) => {
        if (!socket || isGroup) return;
        socket.emit('typing', { toUserId: id, isTyping });
    };

    const handleDelete = async (messageId, deleteType) => {
        setShowMessages(prev => prev.filter(m => m.id !== messageId));

        try {
            await apiFetch(`/api/messages/message/${messageId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleteType }),
            });
        } catch (e) {
            console.error('Ошибка удаления', e);
        }
    };

    const handleEdit = (messageId, text) => {
        setEditingId(messageId);
        setEditText(text);
    };

    const handleEditSave = async (savedText) => {
        if (!savedText.trim()) return;

        const savedId = editingId;
        setEditingId(null);
        setEditText('');

        setShowMessages(prev =>
            prev.map(m => m.id === savedId
                ? { ...m, content: savedText, edited: true }
                : m
            )
        );

        try {
            await apiFetch(`/api/messages/message/${savedId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: savedText }),
            });
        } catch (e) {
            console.error('Ошибка редактирования:', e);
        }
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleReply = (msg) => {
        setReplyTo(msg);
        setEditingId(null);
        setEditText('');
    };

    const handleReplyCancel = () => setReplyTo(null);

    const getTitle = () => {
        if (isGroup) return groupChatInfo?.chatName ?? 'Групповой чат';
        return user?.firstName ? user.firstName : 'пользователем';
    };

    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (payload) => {
            if (!isGroup && parseInt(payload.senderId) === parseInt(id)) {
                setShowMessages((prev) => [
                    ...prev,
                    {
                        id: payload.id,
                        fromMe: false,
                        content: payload.content,
                        attachments: payload.attachments ?? null,
                        created_at: payload.created_at,
                        replyPreview: payload.replyPreview ?? null,
                        forwardedFromUser: payload.forwardedFromUser ?? null,
                    },
                ]);
                // Помечаем прочитанным сразу, раз чат открыт
                if (payload.chatId) {
                    apiFetch(`/api/chats/${payload.chatId}/read`, { method: 'POST' }).catch(() => { });
                }
            }
        };

        const handleReceiveGroupMessage = (payload) => {
            if (isGroup && parseInt(payload.chatId) === parseInt(chatId)) {
                setShowMessages((prev) => [
                    ...prev,
                    {
                        id: payload.id,
                        fromMe: false,
                        senderId: payload.senderId,
                        senderUser: payload.user,
                        content: payload.content,
                        attachments: payload.attachments ?? null,
                        created_at: payload.created_at,
                        checkStatus: 1,
                        replyPreview: payload.replyPreview ?? null,
                        forwardedFromUser: payload.forwardedFromUser ?? null,
                    },
                ]);
            }
        };

        const handleMessageEdited = (payload) => {
            setShowMessages((prev) =>
                prev.map((msg) =>
                    msg.id === payload.messageId
                        ? { ...msg, content: payload.content, edited: true }
                        : msg
                )
            );
        };

        const handleMessageDeleted = ({ messageId }) => {
            setShowMessages(prev => prev.filter(m => m.id !== messageId));
        };

        const handleTyping = ({ fromUserId, isTyping }) => {
            if (isGroup) return;
            if (parseInt(fromUserId) !== parseInt(id)) return;
            setIsPartnerTyping(isTyping);
        };

        const handleMessagesRead = ({ chatId: readChatId, readBy }) => {
            if (parseInt(readBy) === parseInt(currentUserIdRef.current)) return;
            if (parseInt(readChatId) !== parseInt(currentChatIdRef.current)) return;
            setShowMessages(prev => prev.map(msg =>
                msg.fromMe && msg.checkStatus === 1 ? { ...msg, checkStatus: 3 } : msg
            ));
        };

        socket.on('receive_message', handleReceiveMessage);
        socket.on('receive_group_message', handleReceiveGroupMessage);
        socket.on('message_edited', handleMessageEdited);
        socket.on('message_deleted', handleMessageDeleted);
        socket.on('typing', handleTyping);
        socket.on('messages_read', handleMessagesRead);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.off('receive_group_message', handleReceiveGroupMessage);
            socket.off('message_edited', handleMessageEdited);
            socket.off('message_deleted', handleMessageDeleted);
            socket.off('typing', handleTyping);
            socket.off('messages_read', handleMessagesRead);
        };
    }, [socket, id, chatId, isGroup]);

    const isReady = isGroup
        ? groupChatInfo && currentUserId
        : messages && user && currentUserId;

    return (
        <AppProfile title={`Чат с ${getTitle()}`} desc={`Переписка в Аквариум`} nonav>
            <LayoutChat>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError title="Ошибка при получении сообщений" />
                ) : isReady ? (
                    <>
                        <ChatHeader
                            user={user ?? {}}
                            currentUserId={currentUserId ?? 0}
                            isGroup={isGroup}
                            groupName={groupChatInfo?.chatName ?? ''}
                            groupImage={groupChatInfo?.chatImage ?? ''}
                            groupMembers={groupChatInfo?.users ?? []}
                            chatId={isGroup ? chatId : null}
                            isPartnerTyping={isPartnerTyping}
                        />

                        <ChatMessages
                            messages={showMessages}
                            Bubble={ChatBubble2}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onReply={handleReply}
                            isGroup={isGroup}
                            bookmark={user?.bookmark ?? false}
                            currentUserId={currentUserId}
                        />
                    </>
                ) : null}

                <ChatFooter
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    sendMessage={sendMessage}
                    attachments={chatAttachments}
                    setAttachments={setChatAttachments}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    onTyping={handleTypingEmit}
                    replyTo={replyTo}
                    onReplyCancel={handleReplyCancel}
                />
            </LayoutChat>
        </AppProfile>
    );
}

export default PageChat;
