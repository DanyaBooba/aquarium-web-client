import {
    Box,
    Typography,
    Avatar,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Divider,
    IconButton,
} from '@mui/joy';
import {
    // Heart,
    DotsThreeVertical,
    PencilSimple,
    Trash,
    Flag,
    X,
    Check,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import FormatDateDistanceToNow from '../FormatDateDistanceToNow/FormatDateDistanceToNow';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';
import { useEffect, useRef, useState } from 'react';

// function CommentLike({ likes = 0, liked = false }) {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 0.5,
//                 px: 0.75,
//                 py: 0.25,
//                 borderRadius: '100px',
//                 cursor: 'pointer',
//                 width: 'fit-content',
//                 '&:hover': {
//                     backgroundColor: 'neutral.softHoverBg',
//                 },
//             }}
//         >
//             <Heart
//                 size={16}
//                 weight={liked ? 'fill' : 'regular'}
//                 color={liked ? '#ff0000' : 'currentColor'}
//             />
//             {!!likes && likes > 0 && (
//                 <Typography level="body-xs">{likes}</Typography>
//             )}
//         </Box>
//     );
// }

function CommentItem({ comment, onDelete = () => { }, onEdit = () => { } }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const contentRef = useRef(null);

    const startEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (!contentRef.current) return;
            contentRef.current.textContent = editContent;
            contentRef.current.focus();

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(contentRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }, 0);
    };

    const cancelEditing = () => {
        setEditContent(comment.content);
        setIsEditing(false);
    };

    const saveEditing = async () => {
        setIsEditing(false);

        try {
            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) throw new Error('Требуется авторизация')

            const res = await fetch(`https://mini.aquarium.org.ru/api/post/comments`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: comment.id,
                    content: editContent
                }),
            })

            if (!res.ok) throw new Error('Ошибка при редактировании комментария');
            const data = await res.json();

            if (data?.success) {
                onEdit(comment.id, editContent);
            }
        } catch (err) {

        }
    };

    const handlerOnClickDelete = () => setOpenDeleteModal(true)

    const handlerDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) throw new Error('Требуется авторизация')

            const res = await fetch(`https://mini.aquarium.org.ru/api/post/comments?id=${comment.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) throw new Error('Ошибка при редактировании комментария');
            const data = await res.json();

            if (data?.success) {
                onDelete(comment.id);
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        setEditContent(comment.content);
    }, [comment.content]);

    return (
        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
            <Box component="a" href={`/show/id/${comment?.user?.id}`}>
                <Avatar src={comment.user?.avatar} size="md" sx={{ mt: 0.25 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                    <Box component="a" href={`/show/id/${comment?.user?.id}`} sx={{ textDecoration: "none" }}>
                        <Typography level="body-sm" fontWeight={500}>
                            {comment.user?.firstName} {comment.user?.lastName}
                        </Typography>
                        <Typography level="body-xs" color="neutral">
                            <FormatDateDistanceToNow dateString={comment.created_at} />
                        </Typography>
                    </Box>

                    {!isEditing && (
                        <Dropdown>
                            <MenuButton
                                slots={{ root: Box }}
                                slotProps={{
                                    root: {
                                        sx: {
                                            width: 32,
                                            height: 32,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            color: "neutral.500",
                                            "&:hover": { backgroundColor: "neutral.softHoverBg" },
                                        },
                                    },
                                }}
                            >
                                <DotsThreeVertical size={18} />
                            </MenuButton>
                            <Menu placement="bottom-end" variant="plain" sx={{ borderRadius: 12 }}>
                                {comment.myComment && (
                                    <>
                                        <MenuItem sx={{ py: "6px", px: "10px" }} onClick={startEditing}>
                                            <PencilSimple size={18} /> Редактировать
                                        </MenuItem>
                                        <Divider sx={{ my: 0.5 }} />
                                        <MenuItem sx={{ py: "6px", px: "10px" }} color="danger" onClick={handlerOnClickDelete}>
                                            <Trash size={18} /> Удалить
                                        </MenuItem>
                                    </>
                                )}
                                {!comment.myComment && (
                                    <MenuItem sx={{ py: "6px", px: "10px" }} color="danger">
                                        <Flag size={18} /> Пожаловаться
                                    </MenuItem>
                                )}
                            </Menu>
                        </Dropdown>
                    )}

                    {isEditing && (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton size="sm" onClick={saveEditing} sx={{ borderRadius: '50px' }}>
                                <Check size={18} color="#28a745" />
                            </IconButton>
                            <IconButton size="sm" onClick={cancelEditing} sx={{ borderRadius: '50px' }}>
                                <X size={18} color="#d32f2f" />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                <Typography
                    key={isEditing ? 'editing' : 'viewing'}
                    ref={contentRef}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    sx={{
                        mt: 0.75,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        outline: isEditing ? "2px solid #8884ff" : "none",
                        borderRadius: "4px",
                        px: isEditing ? 0.5 : 0
                    }}
                    onInput={(e) => setEditContent(e.currentTarget.textContent)}
                >
                    {!isEditing ? comment.content : undefined}
                </Typography>
            </Box>
            <ModalConfirmDelete
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onDelete={handlerDelete}
                desc="Вы действительно хотите удалить комментарий? Это действие необратимо."
            />
        </Box>
    );
}

export function CommentsShow({ comments = [], newComments = [], onDelete, onEdit }) {
    return (
        <Box>
            <AnimatePresence initial={false}>
                {newComments.map((comment) => (
                    <motion.div
                        key={`new-${comment.id}`}
                        initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <CommentItem comment={comment} onDelete={onDelete} onEdit={onEdit} />
                    </motion.div>
                ))}
            </AnimatePresence>

            <AnimatePresence initial={false}>
                {comments.map((comment) => (
                    <motion.div
                        key={`fetch-${comment.id}`}
                        initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <CommentItem comment={comment} onDelete={onDelete} onEdit={onEdit} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </Box>
    );
}
