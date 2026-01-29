import { useState } from "react";
import { Box, IconButton, Sheet, Textarea } from "@mui/joy";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

function ChatFooter({ newMessage, setNewMessage, sendMessage }) {
    const MAX_LENGTH = 1000;
    const [value, setValue] = useState("");

    const isActive = value.trim().length > 0;

    const handleChange = (e) => {
        const nextValue = e.target.value;
        if (nextValue.length > MAX_LENGTH) return;
        setValue(nextValue);
        setNewMessage(nextValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey) return;
        if (
            e.key === "Enter" &&
            (!e.shiftKey && (!e.ctrlKey && !e.metaKey) || e.ctrlKey || e.metaKey)
        ) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (!isActive) return;
        sendMessage();
        setValue("");
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: '0',
                left: '0',
                display: "flex",
                justifyContent: "center",
                width: "100%",
                p: 2,
                pointerEvents: 'none',
            }}
        >
            <Sheet
                variant="plain"
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "end",
                    p: 1,
                    borderRadius: "29px",
                    background: `${theme.palette.background.surface}bb`,
                    border: `1px solid ${theme.colors.logo}33`,
                    backdropFilter: "blur(12px)",
                    width: "100%",
                    maxWidth: 525,
                    pointerEvents: 'all',
                })}
            >
                <Textarea
                    maxRows={6}
                    placeholder="Сообщение"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    sx={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        borderRadius: "25px",
                        px: "1rem",
                        pb: '8px',
                        '& textarea': { padding: 0 },
                        '&:focus-visible': {
                            outline: 'none',
                        },
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                        '--Textarea-focusedThickness': '0px',
                        '--Textarea-focusedHighlight': 'transparent',
                    }}
                />

                <motion.div
                    animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginLeft: 8 }}
                >
                    <IconButton
                        color="primary"
                        disabled={!isActive}
                        onClick={handleSubmit}
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            p: 0,
                        }}
                    >
                        <PaperPlaneRight size={20} weight="fill" />
                    </IconButton>
                </motion.div>
            </Sheet>
        </Box>
    );
}

export default ChatFooter;
