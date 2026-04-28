import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/joy';
import { AnimatePresence } from 'framer-motion';
import { NotFound } from '../ServerError/ServerError';
import { CaretDown } from '@phosphor-icons/react';

function ChatMessages({ messages, Bubble, onEdit, onDelete, onReply, isGroup = false, bookmark = false, currentUserId = null }) {
    const scrollRef = useRef(null);
    const prevLengthRef = useRef(0);
    const initialScrollDone = useRef(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    const scrollToBottom = useCallback((smooth = false) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: smooth ? 'smooth' : 'instant',
        });
    }, []);

    // Скролл вниз при первой загрузке сообщений
    useEffect(() => {
        if (!initialScrollDone.current && messages?.length > 0) {
            scrollToBottom(false);
            initialScrollDone.current = true;
        }
    }, [messages, scrollToBottom]);

    // Скролл вниз при новом сообщении
    useEffect(() => {
        const currentLength = messages?.length ?? 0;
        const prevLength = prevLengthRef.current;

        if (currentLength > prevLength && initialScrollDone.current) {
            const el = scrollRef.current;
            if (!el) return;
            const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
            if (isNearBottom) scrollToBottom(true);
        }

        prevLengthRef.current = currentLength;
    }, [messages, scrollToBottom]);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollBtn(distanceFromBottom > 200);
    };

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <Box
                ref={scrollRef}
                onScroll={handleScroll}
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2,
                    pt: 2,
                    pb: 12,
                    overflowY: 'auto',
                    gap: '12px',
                }}
            >
                <AnimatePresence initial={false}>
                    {messages.length > 0 && messages.map((msg, index) => (
                        <Bubble
                            key={`${msg?.id ?? msg?.content}-${index}`}
                            {...msg}
                            isGroup={isGroup}
                            currentUserId={currentUserId}
                            onEdit={(text) => onEdit?.(msg.id, text)}
                            onDelete={(deleteType) => onDelete?.(msg.id, deleteType)}
                            onReply={(replyData) => onReply?.(replyData)}
                            bookmark={bookmark ?? false}
                        />
                    ))}
                    {messages.length === 0 && (
                        <NotFound img="no-messages.svg" title="Начните общение прямо сейчас!" />
                    )}
                </AnimatePresence>
            </Box>

            <IconButton
                onClick={() => scrollToBottom(true)}
                variant="soft"
                color="neutral"
                sx={{
                    position: 'absolute',
                    bottom: '90px',
                    right: '16px',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    zIndex: 10,
                    opacity: showScrollBtn ? 1 : 0,
                    transform: showScrollBtn ? 'translateY(0)' : 'translateY(8px)',
                    pointerEvents: showScrollBtn ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
            >
                <CaretDown size={20} />
            </IconButton>
        </Box>
    );
}

export default ChatMessages;
