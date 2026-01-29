import { Box, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { messageCheckStatus } from '../../../../utils/messageCheckStatus';

const MotionBox = motion.create(Box);

function ChatBubble2({
    fromMe,
    content,
    created_at,
    checkStatus = 1,
}) {
    const isEmojiOnly = (text) => {
        const value = text.trim();

        if (!value) return false;

        return /^[\p{Extended_Pictographic}\s]+$/u.test(value);
    };

    const emojiFontSize = (text) => {
        const size = parseInt((text?.length ?? 1) / 2)
        switch (size) {
            case 1:
                return '50px'
            case 2:
                return '50px'
            case 3:
                return '40px'
            case 4:
                return '40px'
            case 5:
                return '30px'
            case 6:
                return '30px'
            default:
                return '26px'
        }
    }

    const backgroundColor = () => {
        if (isEmojiOnly(content)) {
            return 'transparent'
        }

        return fromMe ? 'primary.500' : 'neutral.softBg'
    }

    const showTime = (time) => {
        return new Date(time).toLocaleTimeString().slice(0, 5)
    }

    return (
        <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: fromMe ? 'flex-end' : 'flex-start',
                '& p': {
                    color: fromMe ? 'white' : 'text.primary',
                    fontSize: isEmojiOnly(content) && emojiFontSize(content),
                },
            }}
        >
            <Box
                sx={{
                    backgroundColor: backgroundColor(),
                    color: fromMe ? 'white' : 'text.primary',
                    p: !isEmojiOnly(content) && '12px 16px 12px 16px',
                    mb: isEmojiOnly(content) && '-8px',
                    maxWidth: '400px',
                    borderRadius: fromMe
                        ? '23px 23px 4px 23px'
                        : '23px 23px 23px 4px',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                    hyphens: 'auto',
                }}
            >
                <Typography level="body-sm">{content.trim()}</Typography>
            </Box>
            <Typography
                component="span"
                level="body-xs"
                textAlign={fromMe ? 'right' : 'left'}
                sx={{ mt: 0.5, opacity: .5 }}
                endDecorator={fromMe && messageCheckStatus(checkStatus)}
            >
                {showTime(created_at)}
            </Typography>
        </MotionBox>
    );
}

export default ChatBubble2;
