import { useEffect, useState } from "react";
import { Snackbar, Avatar, Box, Typography } from "@mui/joy";
import { useSocket } from "../../app/SocketProvider";
import { useMatch, useNavigate } from "react-router-dom";

function DisplayUser({ avatar, firstName, lastName, message }) {
    return (
        <>
            <Avatar
                src={avatar}
                alt={`${firstName} ${lastName}`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, }}>
                <Typography
                    level="title-md"
                    sx={{
                        flex: 1,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                    {firstName}{' '}{lastName}
                </Typography>
                <Typography
                    level="body-sm"
                    color="neutral"
                    noWrap>
                    {message}
                </Typography>
            </Box>
        </>
    )
}

export default function MessageNotification() {
    const socket = useSocket();
    const match = useMatch("/chat/:id");
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!socket) return;

        const chatId = match?.params?.id ?? null;

        socket.on("new_message", (data) => {
            if (chatId) return;
            setMessage(data);
            setOpen(true);
        });

        return () => {
            socket.off("new_message");
        };
    }, [socket]);

    if (!message) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            onClick={() => {
                setOpen(false);
                navigate(`/chat/${message?.senderId}`);
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={theme => ({
                borderRadius: '12px',
                boxShadow: 'sm',
                backgroundColor: `${theme.palette.background.surface}bb`,
                backdropFilter: 'blur(12px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                maxWidth: '400px',
                width: 'clamp(300px, 90%, 400px)',
                mx: 'auto',
                cursor: 'pointer'
            })}
        >
            <DisplayUser
                avatar={message?.user?.avatar}
                firstName={message?.user?.firstName}
                lastName={message?.user?.lastName}
                message={message?.content}
            />
        </Snackbar>
    );
}
