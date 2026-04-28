import { useEffect, useState } from "react";
import { Snackbar, Avatar, Box, Typography } from "@mui/joy";
import { useSocket } from "../../app/SocketProvider";
import { useMatch, useNavigate } from "react-router-dom";
import { UsersThree } from "@phosphor-icons/react";

const API_URL = process.env.REACT_APP_API_URL ?? '';

function GroupAvatarStack({ groupImage, groupName, senderAvatar, senderName }) {
    const groupSrc = groupImage
        ? (groupImage.startsWith('http') ? groupImage : `${API_URL}${groupImage}`)
        : null;
    const senderSrc = senderAvatar
        ? (senderAvatar.startsWith('http') ? senderAvatar : `${API_URL}${senderAvatar}`)
        : null;

    return (
        <Box sx={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
            {groupSrc ? (
                <Avatar src={groupSrc} alt={groupName} sx={{ width: 44, height: 44 }} />
            ) : (
                <Box sx={(theme) => ({
                    width: 44, height: 44, borderRadius: '50%',
                    backgroundColor: theme.palette.primary[500],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                })}>
                    <UsersThree size={22} color="white" weight="fill" />
                </Box>
            )}
            <Box sx={(theme) => ({
                position: 'absolute', bottom: -2, right: -2,
                borderRadius: '50%',
                border: `2px solid ${theme.palette.background.surface}bb`,
                width: 22, height: 22,
                overflow: 'hidden',
                backgroundColor: theme.palette.background.level2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            })}>
                {senderSrc ? (
                    <img src={senderSrc} alt={senderName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Typography level="body-xs" sx={{ fontSize: 9, fontWeight: 700, lineHeight: 1 }}>
                        {senderName?.[0]?.toUpperCase() ?? '?'}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

function SingleAvatar({ avatar, firstName, lastName }) {
    const src = avatar
        ? (avatar.startsWith('http') ? avatar : `${API_URL}${avatar}`)
        : null;
    return (
        <Avatar src={src} alt={`${firstName} ${lastName}`} sx={{ width: 44, height: 44, flexShrink: 0 }} />
    );
}

function NotificationContent({ data }) {
    if (data.isGroup) {
        return (
            <>
                <GroupAvatarStack
                    groupImage={data.groupImage}
                    groupName={data.groupName}
                    senderAvatar={data.user?.avatar}
                    senderName={data.user?.firstName}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <Typography level="title-sm" noWrap>
                        {data.groupName}
                    </Typography>
                    <Typography level="body-xs" color="neutral" noWrap>
                        {data.user?.firstName}: {data.content || 'Вложение'}
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <SingleAvatar
                avatar={data.user?.avatar}
                firstName={data.user?.firstName}
                lastName={data.user?.lastName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography level="title-sm" noWrap>
                    {data.user?.firstName}{' '}{data.user?.lastName}
                </Typography>
                <Typography level="body-xs" color="neutral" noWrap>
                    {data.content || 'Вложение'}
                </Typography>
            </Box>
        </>
    );
}

export default function MessageNotification() {
    const socket = useSocket();
    const matchChat = useMatch("/chat/:id");
    const matchGroup = useMatch("/chat/g/:chatId");
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!socket) return;

        const currentChatId = matchChat?.params?.id ?? null;
        const currentGroupId = matchGroup?.params?.chatId ?? null;

        const handleNewMessage = (data) => {
            if (currentChatId) return;
            setMessage({ ...data, isGroup: false });
            setOpen(true);
        };

        const handleNewGroupMessage = (data) => {
            if (currentGroupId && String(currentGroupId) === String(data.groupChatId)) return;
            setMessage({ ...data, isGroup: true });
            setOpen(true);
        };

        socket.on("new_message", handleNewMessage);
        socket.on("new_group_message", handleNewGroupMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
            socket.off("new_group_message", handleNewGroupMessage);
        };
    }, [socket, matchChat, matchGroup]);

    if (!message) return null;

    const handleClick = () => {
        setOpen(false);
        if (message.isGroup) {
            navigate(`/chat/g/${message.groupChatId}`);
        } else {
            navigate(`/chat/${message.senderId}`);
        }
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            onClick={handleClick}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={theme => ({
                borderRadius: '24px',
                boxShadow: 'sm',
                backgroundColor: `${theme.palette.background.surface}bb`,
                backdropFilter: 'blur(12px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                maxWidth: '400px',
                width: 'clamp(300px, 90%, 400px)',
                mx: 'auto',
                cursor: 'pointer',
                px: 2,
                py: 1.5,
            })}
        >
            <NotificationContent data={message} />
        </Snackbar>
    );
}
