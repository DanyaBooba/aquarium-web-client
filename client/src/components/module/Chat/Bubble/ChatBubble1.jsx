import { Box, Typography } from '@mui/joy';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

function ChatBubble1({ fromMe, text, time }) {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            sx={{
                alignSelf: fromMe ? 'flex-end' : 'flex-start',
                backgroundColor: fromMe ? 'primary.500' : 'neutral.softBg',
                color: fromMe ? 'white' : 'text.primary',
                borderRadius: 'lg',
                px: 2,
                py: 1,
                maxWidth: '400px',
                '& p': {
                    color: fromMe ? 'white' : 'text.primary',
                },
                '& span': {
                    color: fromMe ? 'white' : 'text.primary',
                },
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                wordBreak: 'break-all',
                hyphens: 'auto',
            }}
        >
            <Typography level="body-sm">{text}</Typography>
            <Typography
                level="body-xs"
                textAlign="right"
                mt={0.5}
                sx={{ opacity: 0.6 }}
            >
                {time}
            </Typography>
        </MotionBox>
    );
}

export default ChatBubble1;
