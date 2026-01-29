import { useEffect, useRef } from 'react';
import { Box } from '@mui/joy';
import { AnimatePresence } from 'framer-motion';
import { NotFound } from '../ServerError/ServerError';

function ChatMessages({ messages, Bubble }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Box
            ref={scrollRef}
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                pt: 2,
                pb: 12,
                overflowY: 'auto',
                gap: 1.5,
            }}
        >
            <AnimatePresence initial={false}>
                {messages.length > 0 && messages.map((msg, index) => <Bubble key={`${msg?.content}-${index}`} {...msg} />)}
                {messages.length === 0 && (
                    <NotFound img="no-messages" title="Начните общение прямо сейчас!" />
                )}
            </AnimatePresence>
        </Box>
    )
}

export default ChatMessages;
