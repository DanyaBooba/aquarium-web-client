import { Avatar, Box, Typography } from "@mui/joy";
import Badge, { badgeClasses } from "@mui/joy/Badge";
import { BookmarkSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useIsOnline } from "../../../app/OnlineProvider";
import VerifiedBadge from '../../../ui/VerifiedBadge';

const dotKeyframes = `
@keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
}
`;

function TypingIndicator() {
    return (
        <>
            <style>{dotKeyframes}</style>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
                <Typography level="body-xs" sx={{ lineHeight: '14px', mr: '2px' }}>
                    печатает
                </Typography>
                {[0, 1, 2].map(i => (
                    <Box
                        key={i}
                        sx={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.500',
                            animation: `typingBounce 1.2s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </Box>
        </>
    );
}

export default function ChatDisplayUser({ id = 0, avatar, firstName, lastName, verified = false, bookmark = false, isTyping = false }) {
    const navigate = useNavigate();
    const isOnline = useIsOnline(!bookmark ? id : null);

    const ChatName = () => (
        <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                <Typography
                    level="title-md"
                    noWrap
                    sx={{ minWidth: 0 }}
                >
                    {!bookmark ? <>{firstName}{' '}{lastName}</> : <>Избранное</>}
                </Typography>
                {!!verified && !bookmark && <VerifiedBadge size={16} />}
            </Box>
            {isTyping && <TypingIndicator />}
        </Box>
    )

    if (bookmark) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <Box sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: theme.colors.logo,
                    '& svg': {
                        fill: theme.colors.logoText
                    },
                })}>
                    <BookmarkSimple weight="fill" size={20} />
                </Box>
                <ChatName />
            </Box>
        )
    }

    return (
        <Box
            component="button"
            type="button"
            onClick={() => navigate(`/show/id/${id}`)}
            aria-label="Открыть профиль"
            sx={{
                all: 'unset',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                minWidth: 0,
                width: '100%',
                '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.outlinedBorder',
                    borderRadius: 8,
                },
                gap: 1,
            }}
        >
            <Badge
                invisible={!isOnline}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeInset="14%"
                color="success"
                sx={{
                    [`& .${badgeClasses.badge}`]: {
                        '&::after': {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: 'background.surface',
                            boxSizing: 'content-box',
                            transform: 'translate(-2px, -2px) !important',
                            content: '""',
                        },
                    },
                }}
            >
                <Avatar
                    src={!bookmark ? (avatar?.includes('http') ? avatar : `${process.env.REACT_APP_API_URL}${avatar}`) : '...'}
                    alt={`${firstName} ${lastName}`}
                />
            </Badge>
            <ChatName />
        </Box>
    )
}
