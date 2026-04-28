import { useEffect, useState } from 'react'

import { AppProfile } from '../../components/app/App'
import { Box, Typography } from '@mui/joy'
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
import PostActions from '../../components/module/AddPost/PostActions'

import { convertHeicToJpg } from '../../utils/convertHeicToJpg'
import {
    MAX_CHARS,
    MAX_FILES,
    MAX_FILE_SIZE_MB,
    ALLOWED_TYPES
} from '../../config/configPost'

import { apiFetch } from '../../utils/apiClient';

function PageAddpost() {
    const [topic, setTopic] = useState('')
    const [attachments, setAttachments] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [charCount, setCharCount] = useState(0)

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

    const handleFileChange = async (e) => {
        setLoading(true)
        setError(null)

        const files = Array.from(e.target.files)

        const availableSlots = MAX_FILES - attachments.length

        if (availableSlots <= 0) {
            setLoading(false)
            setError(`Можно прикрепить не более ${MAX_FILES} файлов`)
            return
        }

        const filesToProcess = files.slice(0, availableSlots)
        const newFiles = []

        for (let file of filesToProcess) {
            if (file.type === 'image/heic' || file.type === 'image/heif') {
                try {
                    file = await convertHeicToJpg(file, 0.8)
                } catch {
                    setLoading(false)
                    setError(`Не удалось обработать файл ${file.name}`)
                    return
                }
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                setLoading(false)
                setError(`Файл «${file.name}» имеет неподдерживаемый формат`)
                return
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setLoading(false)
                setError(`Файл "${file.name}" превышает ${MAX_FILE_SIZE_MB}MB`)
                return
            }

            newFiles.push(file)
        }

        if (files.length > availableSlots) {
            setError(`Можно прикрепить не более ${MAX_FILES} файлов`)
        }

        setAttachments(prev => [...prev, ...newFiles])
        setLoading(false)

        e.target.value = null
    }

    const uploadFiles = async () => {
        const formData = new FormData()
        attachments.forEach(file => formData.append('files', file))

        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) throw new Error('Необходима авторизация')

        const res = await apiFetch('/api/post/upload', {
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

            const postData = {
                theme: topic,
                content: editor.getHTML(),
                attachments: uploadedFiles,
                status,
            }

            const csrfRes = await apiFetch('/api/auth/csrf', { method: 'POST', credentials: 'include' })
            const csrf = await csrfRes.json()

            const res = await apiFetch('/api/post', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRF-Token': csrf.csrfToken,
                },
                body: JSON.stringify(postData),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Неизвестная ошибка')

            window.location.href = `/post/${data.userId}/${data.postId}`
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveAttachment = (fileToRemove) => {
        setAttachments(prev => prev.filter(file => file !== fileToRemove))
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
    }, [editor, isDisabled]);

    return (
        <AppProfile title="Создать запись" desc="Добавьте запись в социальную сеть Аквариум">
            <Typography level="h4" py={2}>Создать запись</Typography>
            {error && <Typography color="danger" sx={{ mb: 2 }}>{error}</Typography>}

            {/* <PostTopicSelector topic={topic} setTopic={setTopic} /> */}

            <Box sx={{ py: 2 }}>
                <MenuBar
                    editor={editor}
                    handleFileChange={handleFileChange}
                    activeAttach={attachments.length < 3}
                />
                <PostEditor
                    editor={editor}
                    attachments={attachments}
                    charCount={charCount}
                    handleRemoveAttachment={handleRemoveAttachment}
                    MAX_CHARS={MAX_CHARS}
                />
            </Box>

            <PostActions
                attachments={attachments}
                isDisabled={isDisabled}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDrawSubmit={handleDrawSubmit}
            />
        </AppProfile>
    )
}

export default PageAddpost
