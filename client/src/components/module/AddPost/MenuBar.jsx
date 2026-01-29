import { Box, IconButton } from '@mui/joy'
import { Paperclip, TextB, TextItalic, TextHThree, ListBullets } from '@phosphor-icons/react'

function MenuBar({ editor, handleFileChange, activeAttach = true }) {
    if (!editor) return null

    return (
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Box sx={{ mr: 'auto' }}>
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
                        borderRadius: '8px',
                        ...(!activeAttach && {
                            pointerEvents: 'none',
                            opacity: 0.5,
                        })
                    }}
                >
                    <Paperclip size={16} />
                </IconButton>
            </Box>
            <IconButton
                size="sm"
                variant={editor.isActive('bold') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                sx={{ px: 1.25, borderRadius: '8px' }}
            >
                <TextB size={16} />
            </IconButton>
            <IconButton
                size="sm"
                variant={editor.isActive('italic') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                sx={{ px: 1.25, borderRadius: '8px' }}
            >
                <TextItalic size={16} />
            </IconButton>
            <IconButton
                size="sm"
                variant={editor.isActive('heading', { level: 3 }) ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                sx={{ px: 1.25, borderRadius: '8px' }}
            >
                <TextHThree size={16} />
            </IconButton>
            <IconButton
                size="sm"
                variant={editor.isActive('bulletList') ? 'solid' : 'soft'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                sx={{ px: 1.25, borderRadius: '8px' }}
            >
                <ListBullets size={16} />
            </IconButton>
        </Box>
    )
}

export default MenuBar
