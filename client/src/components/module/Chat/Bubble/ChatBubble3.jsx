import { Box, Typography } from '@mui/joy';

function ChatMessage({ fromMe, username = 'Имя пользователя', text, time }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                maxWidth: '400px',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                wordBreak: 'break-all',
                hyphens: 'auto',
            }}
        >
            <Typography level="body-xs" sx={{ fontWeight: 500, opacity: 0.8 }}>
                {username}
            </Typography>
            <Typography
                level="body-sm"
                sx={{
                    mt: 0.25,
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    hyphens: 'auto',
                }}
            >
                {text}
            </Typography>
            <Typography
                level="body-xs"
                sx={{ mt: 0.25, opacity: 0.5 }}
            >
                {time}
            </Typography>
        </Box>
    );
}

export default ChatMessage;
