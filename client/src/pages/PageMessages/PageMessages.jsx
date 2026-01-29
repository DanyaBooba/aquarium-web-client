import { AppProfile } from '../../components/app/App';
import { Typography, Box, CircularProgress, Dropdown, MenuButton, Menu, MenuItem } from '@mui/joy';
import ChatListItem from '../../components/module/ChatListItem/ChatListItem';
import { useNavigate } from 'react-router-dom';
import ServerError, { NotFound } from '../../components/module/ServerError/ServerError'
import { useChats } from '../../hooks/messages/useChats'
import { BookmarkSimple, CaretDown, DotsThree, ShareNetwork } from '@phosphor-icons/react';
import SearchBar from '../../components/module/Search/SearchBar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSocket } from '../../components/app/SocketProvider';

// checkStatus
// -1 - сообщение грузится
// 0 — сообщение не мое
// 1 — сообщение отправлено (1 галочка)
// 2 — сообщение доставлено (2 галочки)
// 3 — сообщение прочитано (2 синие галочки)

function ButtonMore({ userId }) {
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
            </Menu>
        </Dropdown>
    )
}

function ShowChats({ chats = [] }) {
    const navigate = useNavigate();

    return (
        <Box>
            {chats.length > 0 ? chats.map((chat, index) => (
                <ChatListItem
                    key={chat?.id}
                    user={chat?.user ?? {}}
                    bookmark={chat?.bookmark}
                    lastMessage={chat?.lastMessage ?? ''}
                    time={''}
                    unread={0}
                    isOnline={false}
                    countChats={chats.length ?? 0}
                    firstBlock={index === 0}
                    lastBlock={index === (chats?.length - 1)}
                    onClick={() => navigate(`/chat/${chat?.user?.id}`, { state: { direction: 1 } })}
                />
            )) : (
                <NotFound
                    title="Чаты не найдены"
                    desc="Начните общение прямо сейчас!"
                    buttonShow={true}
                    buttonName="Начать общение"
                    buttonLink="/search"
                />
            )}
            {chats.length > 0 && (
                <Typography level="body-sm" sx={{ textAlign: 'center', mt: 4 }}>
                    Найдено чатов: {chats.length}
                </Typography>
            )}
        </Box>
    )
}

function PageMessages() {
    const socket = useSocket();

    const [showChats, setShowChats] = useState([]);
    const { chats, userId, loading, error } = useChats();

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

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg) => {
            setShowChats((prevChats) => {
                // находим чат с этим userId
                const updatedChats = prevChats.map(chat => {
                    if (chat.user?.id === msg.user.id) {
                        return {
                            ...chat,
                            lastMessage: msg.content,
                            time: new Date(msg.created_at).toISOString(), // при желании
                            // можно увеличить unread, если хочешь
                            unread: (chat.unread ?? 0) + 1,
                        };
                    }
                    return chat;
                });

                // если чат новый, можно добавить его в список
                const exists = updatedChats.some(chat => chat.user?.id === msg.user.id);
                if (!exists) {
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

        socket.on("new_message", handleNewMessage);
        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, [socket]);

    const isMobile = useMediaQuery('(max-width:1100px)');

    return (
        <AppProfile title="Сообщения" desc="Чаты в Аквариум мини">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, maxHeight: '30px', }}>
                <Typography level="h4">
                    Чаты
                </Typography>
                <Box>
                    <ButtonMore userId={userId} />
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
                <ShowChats chats={showChats ?? []} />
            )}
        </AppProfile>
    );
}

export default PageMessages;
