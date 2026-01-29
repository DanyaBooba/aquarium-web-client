import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppProfile } from '../../components/app/App'
import { Box, Typography, IconButton } from '@mui/joy'
import { X } from '@phosphor-icons/react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

import MenuBar from '../../components/module/AddPost/MenuBar'
import PostEditor from '../../components/module/AddPost/PostEditor'
// import PostTopicSelector from '../../components/module/AddPost/PostTopicSelector'
import PostActionsEditPost from '../../components/module/AddPost/PostActionsEditPost'

import { convertHeicToJpg } from '../../utils/convertHeicToJpg'
import {
    MAX_CHARS,
    MAX_FILES,
    MAX_FILE_SIZE_MB,
    ALLOWED_TYPES
} from '../../config/configPost'
import ModalConfirmDelete from '../../components/module/ModalConfirmDelete/ModalConfirmDelete'

const LINK_CLASSES = 'MuiLink-root MuiLink-colorPrimary MuiLink-body-md MuiLink-underlineHover css-6rd2co-JoyLink-root';

const commonButtonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '6px',
    cursor: 'pointer',
    color: 'neutral.600',
    '&:hover': {
        backgroundColor: 'neutral.softHoverBg',
    },
    '&:focus-visible': {
        outline: '2px solid #8884ff',
        outlineOffset: '2px',
    },
    width: 36,
    height: 36,
};

function PageEditpost() {
    const { globalPostId } = useParams()
    const navigate = useNavigate()

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [topic, setTopic] = useState('')
    const [attachments, setAttachments] = useState([])
    const [serverFiles, setServerFiles] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [charCount, setCharCount] = useState(0)
    const [initialContent, setInitialContent] = useState(null)

    const handleClose = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken')

                const res = await fetch(`https://mini.aquarium.org.ru/api/post?id=${globalPostId}`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                const data = await res.json()

                setTopic(data?.post?.theme)
                setInitialContent(data?.post?.content)
                setServerFiles(data?.post?.attachments || [])
            } catch (err) {
                setError('Ошибка при загрузке поста')
            }
        }

        fetchPost()
    }, [globalPostId])

    useEffect(() => {
        Fancybox.bind('[data-fancybox="gallery"]', {})
        return () => Fancybox.destroy()
    }, [attachments])

    const deleteLink = (node, pos) => {
        if (node.type.name === 'text' && node.marks) {
            node.marks.forEach(mark => {
                if (mark.type.name === 'link') {
                    const href = mark.attrs.href
                    const isUrl = /^https?:\/\/[^\s]+$/.test(node.text.trim())
                    if (!isUrl || node.text !== href) {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run()
                    }
                }
            })
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({ placeholder: 'Напишите что-нибудь...' }),
            Link.configure({
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    class: LINK_CLASSES,
                },
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const text = editor.getText()
            setCharCount(text.length)
            editor.state.doc.descendants(deleteLink)
        },
        editorProps: {
            transformPastedHTML: (html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
                    const h3 = document.createElement('h3');
                    h3.innerHTML = el.innerHTML;
                    el.replaceWith(h3);
                });

                return doc.body.innerHTML;
            }
        }
    })

    useEffect(() => {
        if (editor && initialContent !== null) {
            editor.commands.setContent(initialContent)
        }
    }, [editor, initialContent])

    const handleFileChange = async (e) => {
        setLoading(true)
        const files = Array.from(e.target.files)
        const newFiles = []

        const totalPhotos = serverFiles.length + attachments.length + files.length
        if (totalPhotos > MAX_FILES) {
            setLoading(false)
            setError(`Можно прикрепить не более ${MAX_FILES} файлов`)
            return
        }

        for (let file of files) {
            if (file.type === 'image/heic' || file.type === 'image/heif') {
                try {
                    file = await convertHeicToJpg(file, 0.8)
                } catch (err) {
                    setLoading(false)
                    setError(`Не удалось обработать файл "${file.name}"`)
                    return
                }
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                setLoading(false)
                setError(`Файл "${file.name}" имеет неподдерживаемый формат`)
                return
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setLoading(false)
                setError(`Файл "${file.name}" превышает ${MAX_FILE_SIZE_MB}MB`)
                return
            }

            newFiles.push(file)
        }

        setAttachments(prev => [...prev, ...newFiles])
        setError(null)
        setLoading(false)
    }

    const uploadFiles = async () => {
        const formData = new FormData()
        attachments.forEach(file => formData.append('files', file))

        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) throw new Error('Необходима авторизация')

        const res = await fetch('https://mini.aquarium.org.ru/api/post/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
        })

        if (!res.ok) throw new Error('Ошибка при загрузке файлов')
        const data = await res.json()
        return data.files
    }

    const send = async (status) => {
        try {
            setLoading(true)
            setError(null)

            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) throw new Error('Требуется авторизация')

            const text = editor?.getText() || ''
            if (text.length > MAX_CHARS) throw new Error(`Превышен лимит в ${MAX_CHARS} символов`)

            const rawText = editor?.getText().replace(/\s/g, '') || ''
            const rawHTML = editor?.getHTML().replace(/\s|<br>|<p><\/p>/g, '') || ''
            if (!rawText || !rawHTML) throw new Error('Запись не может быть пустой')

            let uploadedFiles = []
            if (attachments.length > 0) {
                uploadedFiles = await uploadFiles()
            }

            const allAttachments = [...serverFiles, ...uploadedFiles]

            const postData = {
                theme: topic,
                content: editor.getHTML(),
                attachments: allAttachments,
                status,
            }

            const res = await fetch(`https://mini.aquarium.org.ru/api/post?id=${globalPostId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(postData),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Ошибка при обновлении')

            window.location.href = `/post/${data.userId}/${data.postId}`
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleOnClickDeletePost = () => setOpenDeleteModal(true)

    const handleDeletePost = async () => {
        try {
            setLoading(true)
            setError(null)

            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) throw new Error('Требуется авторизация')

            const res = await fetch(`https://mini.aquarium.org.ru/api/post?id=${globalPostId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (!res.ok) throw new Error('Ошибка при удалении поста')

            navigate('/profile')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveAttachment = (fileToRemove) => {
        setAttachments(prev => prev.filter(file => file !== fileToRemove))
    }

    const handleRemoveServerFile = (urlToRemove) => {
        setServerFiles(prev => prev.filter(url => url !== urlToRemove))
    }

    const handleSubmit = () => send(-1)
    const handleDrawSubmit = () => send(0)

    const isEditorContentEmpty = () => {
        const rawText = editor?.getText().replace(/\s/g, '') || ''
        const rawHTML = editor?.getHTML().replace(/\s|<br>|<p><\/p>/g, '') || ''
        return !rawText || !rawHTML
    }

    const isOverLimit = charCount > MAX_CHARS
    const isDisabled = isEditorContentEmpty() || loading || isOverLimit

    useEffect(() => {
        if (!editor) return;

        const onKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                if (!isDisabled) {
                    handleSubmit();
                }
            }
        };

        editor.view.dom.addEventListener('keydown', onKeyDown);

        return () => {
            editor.view.dom.removeEventListener('keydown', onKeyDown);
        };
    }, [editor, isDisabled, handleSubmit]);

    return (
        <AppProfile title="Изменить запись" desc="Изменение записи в социальной сети Аквариум мини">
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography level="h4">
                    Изменить запись
                </Typography>
                <IconButton
                    size="sm"
                    variant="plain"
                    sx={commonButtonSx}
                    onClick={handleClose}
                    aria-label="Закрыть"
                >
                    <X size={20} />
                </IconButton>
            </Box>
            {error && <Typography color="danger" sx={{ mb: 2 }}>{error}</Typography>}

            {/* <PostTopicSelector topic={topic} setTopic={setTopic} /> */}
            <Box sx={{ py: 2 }}>
                <MenuBar
                    editor={editor}
                    handleFileChange={handleFileChange}
                    activeAttach={attachments.length + serverFiles.length < 3}
                />
                <PostEditor
                    editor={editor}
                    attachments={attachments}
                    serverFiles={serverFiles}
                    charCount={charCount}
                    handleRemoveServerFile={handleRemoveServerFile}
                    handleRemoveAttachment={handleRemoveAttachment}
                    MAX_CHARS={MAX_CHARS}
                />
            </Box>

            <PostActionsEditPost
                countFiles={attachments.length + serverFiles.length}
                isDisabled={isDisabled}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDrawSubmit={handleDrawSubmit}
                handleDeletePost={handleOnClickDeletePost}
            />

            <ModalConfirmDelete
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onDelete={handleDeletePost}
                desc="Вы действительно хотите удалить запись? Это действие необратимо."
            />
        </AppProfile>
    )
}

export default PageEditpost
