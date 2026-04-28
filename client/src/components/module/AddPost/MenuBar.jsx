import { useState, useRef, useEffect } from 'react'
import { Box, IconButton } from '@mui/joy'
import { Paperclip, TextB, TextItalic, TextHThree, ListBullets, SmileyIcon } from '@phosphor-icons/react'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'

function MenuBar({ editor, handleFileChange, activeAttach = true }) {
    const [pickerOpen, setPickerOpen] = useState(false)
    const containerRef = useRef(null);

    const onEmojiClick = (emojiData) => {
        editor.chain().focus().insertContent(emojiData.emoji).run()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setPickerOpen(false);
            }
        };
        if (pickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [pickerOpen]);

    if (!editor) {
        return null
    }

    return (
        <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
            <Box sx={{ mr: 'auto', gap: 1, display: 'flex', position: 'relative' }} ref={containerRef}>
                <input
                    type="file"
                    id="file-input"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                <IconButton
                    component="label"
                    htmlFor="file-input"
                    variant="soft"
                    sx={{
                        borderRadius: '999px',
                        ...(!activeAttach && {
                            pointerEvents: 'none',
                            opacity: 0.5,
                        })
                    }}
                >
                    <Paperclip size={16} />
                </IconButton>

                <IconButton
                    variant="soft"
                    size="md"
                    sx={{ borderRadius: '999px' }}
                    onClick={() => setPickerOpen(!pickerOpen)}
                >
                    <SmileyIcon size={16} />
                </IconButton>

                {pickerOpen && (
                    <Box
                        sx={(theme) => ({
                            position: "absolute",
                            top: "45px",
                            left: '10px',
                            zIndex: 1400,
                            boxShadow: 'lg',
                            borderRadius: "32px",
                            overflow: "hidden",
                            background: theme.palette.background.surface,
                            "& .epr-main .epr-body button:is(:hover, :focus-visible)": {
                                backgroundColor: theme.palette.mode === 'dark' ?
                                    theme.vars.palette.primary[800] :
                                    theme.vars.palette.primary[100],
                            }
                        })}
                    >
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                            emojiStyle={EmojiStyle.APPLE}
                            lazyLoadEmojis
                            searchPlaceholder="Поиск..."
                            autoFocusSearch={false}
                        />
                    </Box>
                )}
            </Box>

            {/* Кнопки форматирования */}
            <IconButton
                size="sm"
                variant={editor.isActive('bold') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                sx={{ px: 1.25, borderRadius: '999px', height: '36px !important' }}
            >
                <TextB size={16} />
            </IconButton>

            <IconButton
                size="sm"
                variant={editor.isActive('italic') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                sx={{ px: 1.25, borderRadius: '999px', height: '36px !important' }}
            >
                <TextItalic size={16} />
            </IconButton>

            <IconButton
                size="sm"
                variant={editor.isActive('heading', { level: 3 }) ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                sx={{ px: 1.25, borderRadius: '999px', height: '36px !important' }}
            >
                <TextHThree size={16} />
            </IconButton>

            <IconButton
                size="sm"
                variant={editor.isActive('bulletList') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                sx={{ px: 1.25, borderRadius: '999px', height: '36px !important' }}
            >
                <ListBullets size={16} />
            </IconButton>
        </Box>
    )
}

export default MenuBar
