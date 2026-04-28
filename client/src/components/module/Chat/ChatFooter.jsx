import { useState, useRef, useEffect } from "react";
import { Box, IconButton, Sheet, Textarea, Badge } from "@mui/joy";
import { Paperclip, PaperPlaneRight, Smiley, X, FilmStrip, File, PencilSimple, Check, ArrowBendUpLeft } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

function ChatFooter({ newMessage, setNewMessage, sendMessage, attachments, setAttachments, editingId, editText, setEditText, onEditSave, onEditCancel, onTyping, replyTo, onReplyCancel }) {
    const MAX_LENGTH = 1000;
    const MAX_FILES = 5;
    const [value, setValue] = useState(newMessage || "");
    const [emojiOpen, setEmojiOpen] = useState(false);

    const pickerRef = useRef(null);
    const buttonRef = useRef(null);
    const fileInputRef = useRef(null);
    const editInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const isEditing = !!editingId;

    const isActive = isEditing
        ? editText.trim().length > 0
        : value.trim().length > 0 || attachments?.length > 0;

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [isEditing]);

    const handleChange = (e) => {
        const nextValue = e.target.value;
        if (nextValue.length > MAX_LENGTH) return;
        setValue(nextValue);
        setNewMessage(nextValue);

        if (onTyping) {
            onTyping(true);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        setAttachments(prev => {
            const combined = [...prev, ...selectedFiles];
            return combined.slice(0, MAX_FILES);
        });

        e.target.value = null;
    };

    const handleRemoveAttachment = (indexToRemove) => {
        setAttachments(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = () => {
        if (!isActive) return;

        if (isEditing) {
            onEditSave(editText);
        } else {
            if (onTyping) {
                clearTimeout(typingTimeoutRef.current);
                onTyping(false);
            }
            sendMessage();
            setValue("");
            setAttachments([]);
        }
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
        if (e.key === "Escape" && isEditing) {
            onEditCancel();
        }
    };

    const onEmojiClick = (emojiData) => {
        if (isEditing) {
            setEditText(prev => prev + emojiData.emoji);
        } else {
            const next = value + emojiData.emoji;
            setValue(next);
            setNewMessage(next);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setEmojiOpen(false);
            }
        }

        if (emojiOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiOpen]);

    const getPreviewUrl = (file) => URL.createObjectURL(file);

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                width: "100%",
                p: 2,
                pointerEvents: "none",
            }}
        >
            <Sheet
                variant="plain"
                sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                    pt: 1,
                    borderRadius: "31px",
                    background: `${theme.palette.background.surface}bb`,
                    border: `1px solid ${theme.colors?.logo || theme.palette.divider}33`,
                    backdropFilter: "blur(12px)",
                    width: "100%",
                    maxWidth: 525,
                    pointerEvents: "all",
                    position: "relative",
                    transition: 'all 0.2s ease',
                })}
            >
                {/* Панель ответа */}
                <AnimatePresence>
                    {replyTo && !isEditing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                pl: 1,
                                pr: '4px',
                                py: 0,
                                mb: "auto",
                                ml: "auto",
                            }}>
                                <ArrowBendUpLeft size={16} style={{ opacity: 0.6, flexShrink: 0 }} />
                                <Box sx={(theme) => ({
                                    fontSize: '13px',
                                    opacity: 0.65,
                                    flex: 1,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    borderLeft: `2px solid ${theme.palette.primary[400]}`,
                                    pl: 1,
                                })}>
                                    {replyTo.content || 'Вложение'}
                                </Box>
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onClick={onReplyCancel}
                                    sx={{ width: 34, height: 34, minWidth: 34, flexShrink: 0, borderRadius: "50%", p: 0, }}
                                >
                                    <X size={16} />
                                </IconButton>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Шапка режима редактирования — плавно появляется внутри Sheet */}
                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                pl: 1,
                                pr: '4px',
                                py: 0,
                                mb: "auto",
                                ml: "auto",
                            }}>
                                <PencilSimple size={16} style={{ opacity: 0.6, flexShrink: 0 }} />
                                <Box sx={{
                                    fontSize: '13px',
                                    opacity: 0.65,
                                    flex: 1,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    Редактирование сообщения...
                                </Box>
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onClick={onEditCancel}
                                    sx={{ width: 34, height: 34, minWidth: 34, flexShrink: 0, borderRadius: "50%", p: 0, }}
                                >
                                    <X size={16} />
                                </IconButton>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Превью прикреплённых файлов — скрываем в режиме редактирования */}
                <AnimatePresence>
                    {!isEditing && attachments?.length > 0 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden" }}
                        >
                            <Box sx={{ display: 'flex', gap: 1.5, p: 1, pb: 2, overflowX: 'auto' }}>
                                {attachments.map((file, index) => {
                                    const isVideo = file.type.startsWith('video/');
                                    return (
                                        <Box key={index} sx={{ position: 'relative', flexShrink: 0 }}>
                                            <Badge
                                                badgeContent={
                                                    <IconButton
                                                        size="sm"
                                                        variant="solid"
                                                        color="danger"
                                                        onClick={() => handleRemoveAttachment(index)}
                                                        sx={{
                                                            minWidth: '20px',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            p: 0,
                                                            transform: 'scale(.7)'
                                                        }}
                                                    >
                                                        <X size={12} weight="bold" />
                                                    </IconButton>
                                                }
                                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                sx={{
                                                    '& .MuiBadge-badge': {
                                                        transform: 'translate(25%, -25%)',
                                                        p: '0px !important',
                                                        background: 'transparent !important',
                                                        boxShadow: 'none !important'
                                                    }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        bgcolor: 'background.level2',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    {file.type.startsWith('image/') ? (
                                                        <img
                                                            src={getPreviewUrl(file)}
                                                            alt="preview"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    ) : isVideo ? (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.7 }}>
                                                            <FilmStrip size={24} />
                                                            <Box sx={{ fontSize: '10px', mt: 0.5, maxWidth: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {file.name}
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.7 }}>
                                                            <File size={24} />
                                                            <Box sx={{ fontSize: '10px', mt: 0.5, maxWidth: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {file.name}
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Badge>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        multiple
                        accept="*"
                        onChange={handleFileChange}
                    />

                    <IconButton
                        color="neutral"
                        onClick={() => fileInputRef.current.click()}
                        sx={{ width: 40, height: 40, minWidth: 40, flexShrink: 0, borderRadius: "50%", p: 0, mb: '2px' }}
                    >
                        <Paperclip size={22} />
                    </IconButton>

                    <IconButton
                        ref={buttonRef}
                        color="neutral"
                        onClick={() => setEmojiOpen(prev => !prev)}
                        sx={{ width: 40, height: 40, minWidth: 40, flexShrink: 0, borderRadius: "50%", p: 0, mb: '2px' }}
                    >
                        <Smiley size={22} />
                    </IconButton>

                    {/* Выбор эмодзи — смайлик попадает в активное поле */}
                    {emojiOpen && (
                        <Box
                            ref={pickerRef}
                            sx={(theme) => ({
                                position: "absolute",
                                bottom: "60px",
                                left: 0,
                                zIndex: 1000,
                                boxShadow: "lg",
                                borderRadius: "32px",
                                "& .epr-main .epr-body button:is(:hover, :focus-visible)": {
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.vars.palette.primary[800] : theme.vars.palette.primary[100],
                                }
                            })}
                        >
                            <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle={EmojiStyle.APPLE} lazyLoadEmojis searchPlaceholder="Поиск..." autoFocusSearch={false} />
                        </Box>
                    )}

                    {/* Поле ввода — переключается между режимами */}
                    {isEditing ? (
                        <Textarea
                            maxRows={6}
                            placeholder="Редактировать сообщение..."
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            slotProps={{ textarea: { ref: editInputRef } }}
                            sx={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                minWidth: 0,
                                backgroundColor: "transparent",
                                border: "none",
                                boxShadow: "none",
                                borderRadius: "25px",
                                px: "8px",
                                py: "10px",
                                "& textarea": { padding: 0 },
                                "--Textarea-focusedThickness": "0px",
                                "--Textarea-focusedHighlight": "transparent",
                            }}
                        />
                    ) : (
                        <Textarea
                            maxRows={6}
                            placeholder="Сообщение"
                            value={value}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "transparent",
                                border: "none",
                                boxShadow: "none",
                                borderRadius: "25px",
                                px: "8px",
                                py: "10px",
                                "& textarea": { padding: 0 },
                                "--Textarea-focusedThickness": "0px",
                                "--Textarea-focusedHighlight": "transparent",
                            }}
                        />
                    )}
                    {isEditing ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <motion.div
                                animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <IconButton
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{ width: 40, height: 40, minWidth: 40, flexShrink: 0, borderRadius: "50%", p: 0, mb: '2px' }}
                                >
                                    <Check size={22} />
                                </IconButton>
                            </motion.div>
                        </Box>
                    ) : (
                        <motion.div
                            animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <IconButton
                                color="primary"
                                disabled={!isActive}
                                onClick={handleSubmit}
                                sx={{ width: 40, height: 40, minWidth: 40, flexShrink: 0, borderRadius: "50%", p: 0, mb: '2px' }}
                            >
                                <PaperPlaneRight size={22} weight="fill" />
                            </IconButton>
                        </motion.div>
                    )}
                </Box>
            </Sheet >
        </Box >
    );
}

export default ChatFooter;
