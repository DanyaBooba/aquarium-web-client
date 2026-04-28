import { useEffect } from 'react'
import { Box, IconButton, Sheet, Typography } from '@mui/joy'
import { EditorContent } from '@tiptap/react'
import { X } from '@phosphor-icons/react'

function PostEditor({
    editor,
    attachments,
    charCount,
    serverFiles = [],
    handleRemoveAttachment,
    handleRemoveServerFile,
    MAX_CHARS
}) {
    const isOverLimit = charCount > MAX_CHARS

    // освобождаем objectURL чтобы не было утечки памяти
    useEffect(() => {
        const urls = attachments.map(file => URL.createObjectURL(file))
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }
    }, [attachments])

    return (
        <Sheet
            variant="soft"
            sx={{
                borderRadius: '24px',
                p: 2,
                pb: 5,
                '&:has(img), &:has(video)': { pb: 12 },
                cursor: 'text',
                minHeight: 150,
                position: 'relative',
            }}
            onClick={() => editor?.commands.focus()}
        >
            <Box
                sx={{
                    borderRadius: '24px',
                    cursor: 'text',
                    minHeight: 150,
                    '& .ProseMirror': {
                        outline: 'none',
                        minHeight: 150,
                        margin: 0,
                        '& p.is-editor-empty:first-of-type::before': {
                            content: '"Напишите что-нибудь..."',
                            color: 'text.tertiary',
                            float: 'left',
                            height: 0,
                            pointerEvents: 'none',
                            fontSize: '16px',
                        },
                    },
                    '& p': { my: 0 },
                    '& h3': { my: 0 },
                    '& ul': { pl: 2, my: 0 },
                }}
            >
                <EditorContent editor={editor} />

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 2,
                        left: 8,
                        display: 'flex',
                        gap: 1
                    }}
                >
                    {/* ===== Файлы с сервера ===== */}
                    {serverFiles.map((url, index) => {
                        const isImage = /\.(jpe?g|png|gif|webp|bmp)$/i.test(url)
                        const isVideo = /\.(mp4|webm|mov)$/i.test(url)

                        return (
                            <Box key={`server-${index}`} sx={{ position: 'relative' }}>
                                {isImage && (
                                    <a data-fancybox="gallery" href={url}>
                                        <img
                                            src={url}
                                            alt="Файл"
                                            style={{
                                                width: 64,
                                                height: 64,
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                            }}
                                        />
                                    </a>
                                )}

                                {isVideo && (
                                    <video
                                        src={url}
                                        muted
                                        controls
                                        style={{
                                            width: 64,
                                            height: 64,
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                            background: '#000',
                                        }}
                                    />
                                )}

                                <IconButton
                                    size="sm"
                                    variant="soft"
                                    color="neutral"
                                    onClick={() => handleRemoveServerFile?.(url)}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        width: 24,
                                        height: 24,
                                        minWidth: 24,
                                        minHeight: 24,
                                        borderRadius: '50px',
                                        p: 0.5,
                                        borderColor: theme.vars.palette.neutral.softBg,
                                        borderWidth: '3px',
                                        borderStyle: 'solid',
                                        backgroundColor: theme.vars.palette.neutral.softActiveBg,
                                        stroke: theme.vars.palette.neutral.softColor,
                                        '&:hover': {
                                            backgroundColor: theme.vars.palette.neutral.softHoverBg,
                                        },
                                    })}
                                >
                                    <X size={12} />
                                </IconButton>
                            </Box>
                        )
                    })}

                    {/* ===== Локальные файлы ===== */}
                    {attachments.map((file, index) => {
                        const url = URL.createObjectURL(file)
                        const isImage = file.type.startsWith('image/')
                        const isVideo = file.type.startsWith('video/')

                        return (
                            <Box key={`local-${index}`} sx={{ position: 'relative' }}>
                                {isImage && (
                                    <a data-fancybox="gallery" href={url}>
                                        <img
                                            src={url}
                                            alt="Добавленный файл"
                                            style={{
                                                width: 64,
                                                height: 64,
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                            }}
                                        />
                                    </a>
                                )}

                                {isVideo && (
                                    <video
                                        src={url}
                                        muted
                                        controls
                                        style={{
                                            width: 64,
                                            height: 64,
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                            background: '#000',
                                        }}
                                    />
                                )}

                                <IconButton
                                    size="sm"
                                    variant="soft"
                                    color="neutral"
                                    onClick={() => handleRemoveAttachment(file)}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        width: 24,
                                        height: 24,
                                        minWidth: 24,
                                        minHeight: 24,
                                        borderRadius: '50px',
                                        p: 0.5,
                                        borderColor: theme.vars.palette.neutral.softBg,
                                        borderWidth: '3px',
                                        borderStyle: 'solid',
                                        backgroundColor: theme.vars.palette.neutral.softActiveBg,
                                        stroke: theme.vars.palette.neutral.softColor,
                                        '&:hover': {
                                            backgroundColor: theme.vars.palette.neutral.softHoverBg,
                                        },
                                    })}
                                >
                                    <X size={12} />
                                </IconButton>
                            </Box>
                        )
                    })}
                </Box>
            </Box>

            <Typography
                level="body-xs"
                sx={{
                    position: 'absolute',
                    right: 16,
                    bottom: 16,
                    color: isOverLimit ? 'danger.500' : 'text.tertiary',
                }}
            >
                {charCount}/{MAX_CHARS}
            </Typography>
        </Sheet>
    )
}

export default PostEditor
