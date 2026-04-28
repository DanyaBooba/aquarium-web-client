import { useState } from "react";
import { Box, Textarea, IconButton } from "@mui/joy";
import { motion } from "framer-motion";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { apiFetch } from '../../../utils/apiClient'

export function AddComment({ globalPostId = 0, setNewComments = () => { } }) {
    const MAX_LENGTH = 255;

    const [value, setValue] = useState("");
    const isActive = value.trim().length > 0;

    const handleChange = (e) => {
        const nextValue = e.target.value;

        if (nextValue.length > MAX_LENGTH) {
            return;
        }

        setValue(nextValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) return;

        if (
            e.key === 'Enter' &&
            (!e.shiftKey && (!e.ctrlKey && !e.metaKey) || e.ctrlKey || e.metaKey)
        ) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!isActive) return;

        try {
            const res = await apiFetch(`/api/post/comments`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: value,
                    id: globalPostId,
                }),
            });

            if (!res.ok) throw new Error("Ошибка при добавлении комментария");

            const data = await res.json();
            setNewComments(data?.comment ?? {});
        } catch (err) {
            console.error("Ошибка при добавлении комментария");
        } finally {
            setValue("");
        }
    };

    return (
        <Box sx={{ position: "relative", mb: 2 }}>
            <Textarea
                maxRows={6}
                placeholder="Написать комментарий…"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                sx={{
                    pb: isActive ? "3rem" : '.75rem',
                    pt: '.75rem',
                    px: '1rem',
                    borderRadius: '25px',
                    boxShadow: 'none',
                    transition: '.15s',
                }}
            />

            <motion.div
                animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                }}
            >
                <IconButton
                    color="primary"
                    disabled={!isActive}
                    onClick={handleSubmit}
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                    }}
                >
                    <PaperPlaneRight size={20} />
                </IconButton>
            </motion.div>
        </Box>
    );
}
