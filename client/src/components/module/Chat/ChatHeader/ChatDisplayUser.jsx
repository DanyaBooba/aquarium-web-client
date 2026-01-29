import { Avatar, Box, Typography } from "@mui/joy";
import { BookmarkSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function ChatDisplayUser({ id = 0, avatar, firstName, lastName, bookmark = false }) {
    const navigate = useNavigate();

    const ChatName = () => (
        <Typography
            level="title-md"
            sx={{
                flex: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}>
            {!bookmark ? (
                <>
                    {firstName}{' '}{lastName}
                </>
            ) : (
                <>
                    Избранное
                </>
            )}
        </Typography>
    )

    if (bookmark) {
        return (
            <>
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
                    mx: 1,
                })}>
                    <BookmarkSimple weight="fill" size={20} />
                </Box>
                <ChatName />
            </>
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
                '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.outlinedBorder',
                    borderRadius: 8,
                },
            }}
        >
            <Avatar
                src={!bookmark ? avatar : '...'}
                alt={`${firstName} ${lastName}`}
                sx={{ mx: 1 }}
            />
            <ChatName />
        </Box>
    )
}
