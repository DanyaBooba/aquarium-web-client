import { AppProfile } from '../../components/app/App';
import { Typography, Box, CircularProgress, Dropdown, MenuButton, Menu, MenuItem } from '@mui/joy';
import ChatListItem from '../../components/module/ChatListItem/ChatListItem';
import { useNavigate } from 'react-router-dom';
import ServerError, { NotFound } from '../../components/module/ServerError/ServerError'
import { useChats } from '../../hooks/messages/useChats'
import { BookmarkSimple, CaretDown, DotsThree, ShareNetwork, UsersThreeIcon } from '@phosphor-icons/react';
import SearchBar from '../../components/module/Search/SearchBar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSocket } from '../../components/app/SocketProvider';
import ModalCreateGroupChat from '../../components/module/ModalCreateGroupChat/ModalCreateGroupChat';
import { useUsers } from '../../hooks/user/useUsers';

// checkStatus
// -1 - сообщение грузится
// 0 — сообщение не мое
// 1 — сообщение отправлено (1 галочка)
// 2 — сообщение доставлено (2 галочки)
// 3 — сообщение прочитано (2 синие галочки)

function ButtonMore({ userId, setOpenModal }) {
    const navigate = useNavigate();

    return (
        <Dropdown>
            <MenuButton
                variant="plain"
                color="primary"
                sx={(theme) => ({
                    p: 1,
                    borderRadius: "50px",
                    color: theme.palette.mode === 'dark'
                        ? theme.palette.primary[100]
                        : null,
                })}
            >
                <DotsThree size={20} />
            </MenuButton>
            <Menu variant="plain" sx={{ borderRadius: '12px' }}>
                <MenuItem onClick={() => navigate(`/chat/${userId}`)} sx={{ py: 1 }}>
                    <BookmarkSimple size={20} style={{ marginRight: 4 }} />
                    Избранное
                </MenuItem>
                <MenuItem onClick={() => setOpenModal(true)} sx={{ py: 1 }}>
                    <UsersThreeIcon size={20} style={{ marginRight: 4 }} />
                    Групповой чат
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

function ShowChats({ chats = [], suggestedUsers = [], query = '' }) {
    const navigate = useNavigate();

    const noResults = chats.length === 0 && suggestedUsers.length === 0;

    return (
        <>
            <Box>
                {chats.map((chat, index) => (
                    <ChatListItem
                        key={chat?.id}
                        user={chat?.user ?? {}}
                        bookmark={chat?.bookmark}
                        lastMessage={chat?.lastMessage ?? ''}
                        time={''}
                        unread={chat?.unread ?? 0}
                        isOnline={false}
                        countChats={chats.length ?? 0}
                        firstBlock={index === 0}
                        lastBlock={index === (chats?.length - 1)}
                        isGroup={chat?.isGroup ?? false}
                        chatName={chat?.chatName ?? ''}
                        chatImage={chat?.chatImage ?? ''}
                        onClick={() => chat?.isGroup
                            ? navigate(`/chat/g/${chat?.id}`, { state: { direction: 1 } })
                            : navigate(`/chat/${chat?.user?.id}`, { state: { direction: 1 } })
                        }
                    />
                ))}

                {noResults && (
                    <NotFound
                        title="Чаты не найдены"
                        desc="Начните общение прямо сейчас!"
                        buttonShow={true}
                        buttonName="Начать общение"
                        buttonLink="/search"
                    />
                )}

                {suggestedUsers.length > 0 && (
                    <Box sx={{ mt: chats.length > 0 ? 2 : 0 }}>
                        <Typography level="body-xs" sx={{ textTransform: 'uppercase', mb: '.5rem', pl: '17.2px' }}>
                            Предложенные чаты
                        </Typography>
                        {suggestedUsers.map((user, index) => (
                            <ChatListItem
                                key={user?.id}
                                user={user ?? {}}
                                bookmark={false}
                                lastMessage={''}
                                time={''}
                                unread={0}
                                isOnline={false}
                                countChats={suggestedUsers.length}
                                firstBlock={index === 0}
                                lastBlock={index === suggestedUsers.length - 1}
                                isGroup={false}
                                chatName={''}
                                chatImage={''}
                                onClick={() => navigate(`/chat/${user?.id}`, { state: { direction: 1 } })}
                            />
                        ))}
                    </Box>
                )}

                {(chats.length > 0 || suggestedUsers.length > 0) && (
                    <Typography level="body-sm" sx={{ textAlign: 'center', mt: 2, mb: suggestedUsers.length > 0 ? 0 : 2 }}>
                        Найдено чатов: {chats.length + suggestedUsers.length}
                    </Typography>
                )}
            </Box>
        </>
    )
}

function PageMessages() {
    const socket = useSocket();

    const [showChats, setShowChats] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { chats, userId, loading, error } = useChats();
    const { users: allUsers } = useUsers();

    useEffect(() => {
        setShowChats(chats);
    }, [chats, loading]);

    const [query, setQuery] = useState('');

    const handlerQueryChange = (newQuery) => {
        setQuery(newQuery);

        if (!newQuery) {
            setShowChats(chats);
            return;
        }

        const words = newQuery.toLowerCase().trim().split(/\s+/);

        const filtered = chats.filter(chat => {
            const firstName = chat?.user?.firstName?.toLowerCase() ?? '';
            const lastName = chat?.user?.lastName?.toLowerCase() ?? '';
            const username = chat?.user?.username?.toLowerCase() ?? '';

            return words.every(word =>
                firstName.includes(word) || lastName.includes(word) || username.includes(word)
            );
        });

        setShowChats(filtered);
    }

    const chatUserIds = new Set(chats.map(chat => chat?.user?.id).filter(Boolean));

    const suggestedUsers = query.trim()
        ? (allUsers ?? []).filter(user => {
            if (chatUserIds.has(user?.id)) return false;
            const words = query.toLowerCase().trim().split(/\s+/);
            const firstName = user?.firstName?.toLowerCase() ?? '';
            const lastName = user?.lastName?.toLowerCase() ?? '';
            const username = user?.username?.toLowerCase() ?? '';
            return words.every(word =>
                firstName.includes(word) || lastName.includes(word) || username.includes(word)
            );
        })
        : [];

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg) => {
            setShowChats((prevChats) => {
                // Для своих сообщений (fromMe) матчим по recipientId, для чужих — по user.id
                const matchId = msg.fromMe ? msg.recipientId : msg.user?.id;

                const updatedChats = prevChats.map(chat => {
                    if (chat.user?.id === matchId) {
                        return {
                            ...chat,
                            lastMessage: msg.content,
                            time: new Date(msg.created_at).toISOString(),
                            unread: msg.fromMe ? (chat.unread ?? 0) : (chat.unread ?? 0) + 1,
                        };
                    }
                    return chat;
                });

                const exists = updatedChats.some(chat => chat.user?.id === matchId);
                if (!exists && !msg.fromMe) {
                    updatedChats.unshift({
                        user: msg.user,
                        lastMessage: msg.content,
                        time: new Date(msg.created_at).toISOString(),
                        unread: 1,
                    });
                }

                return updatedChats;
            });
        };

        const handleMessageDeleted = ({ chatId, newLastMessage }) => {
            setShowChats(prev => prev.map(chat =>
                chat.id === chatId
                    ? { ...chat, lastMessage: newLastMessage ?? '' }
                    : chat
            ));
        };

        const handleNewGroupMessage = (msg) => {
            setShowChats((prevChats) => prevChats.map(chat =>
                chat.isGroup && chat.id === msg.groupChatId
                    ? {
                        ...chat,
                        lastMessage: msg.content,
                        time: new Date(msg.created_at).toISOString(),
                        unread: (chat.unread ?? 0) + 1,
                    }
                    : chat
            ));
        };

        const handleMessagesRead = ({ chatId }) => {
            setShowChats(prev => prev.map(chat =>
                chat.id === chatId ? { ...chat, unread: 0 } : chat
            ));
        };

        socket.on("new_message", handleNewMessage);
        socket.on("new_group_message", handleNewGroupMessage);
        socket.on("message_deleted", handleMessageDeleted);
        socket.on("messages_read", handleMessagesRead);
        return () => {
            socket.off("new_message", handleNewMessage);
            socket.off("new_group_message", handleNewGroupMessage);
            socket.off("message_deleted", handleMessageDeleted);
            socket.off("messages_read", handleMessagesRead);
        };
    }, [socket]);

    const isMobile = useMediaQuery('(max-width:1100px)');

    return (
        <AppProfile title="Сообщения" desc="Чаты в Аквариум">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, maxHeight: '30px', }}>
                <Typography level="h4">
                    Чаты
                </Typography>
                <Box>
                    <ButtonMore
                        userId={userId}
                        setOpenModal={setOpenModal}
                    />
                </Box>
            </Box>

            <SearchBar
                value={query}
                onChange={handlerQueryChange}
                sx={{
                    mb: 1,
                    top: !isMobile ? '-16px !important' : '0'
                }}
            />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError title="Ошибка при получении чатов" />
            ) : (
                <ShowChats chats={showChats ?? []} suggestedUsers={suggestedUsers} query={query} />
            )}

            <ModalCreateGroupChat
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </AppProfile>
    );
}

export default PageMessages;
