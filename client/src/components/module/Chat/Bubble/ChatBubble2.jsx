import { useState } from 'react';
import { Avatar, Box, Typography, IconButton, Menu, MenuItem, MenuButton, Dropdown, ListItemDecorator, Modal, ModalDialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/joy';
import { motion } from 'framer-motion';
import { DotsThreeVertical, PencilSimple, Trash, Copy, FilmStrip, File, DownloadSimple, ArrowBendUpLeft, ArrowBendDoubleUpRight } from '@phosphor-icons/react';
import ModalForwardMessage from '../../ModalForwardMessage/ModalForwardMessage';
import { useMediaQuery } from '@mui/material';
import { messageCheckStatus } from '../../../../utils/messageCheckStatus';
import VerifiedBadge from '../../../ui/VerifiedBadge';

const MotionBox = motion.create(Box);
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
const API_URL = process.env.REACT_APP_API_URL ?? '';

function chatFileUrl(url) {
    return `${API_URL}${url}`;
}

function formatFileSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function AttachmentGrid({ attachments, fromMe }) {
    const [lightbox, setLightbox] = useState(null);
    const images = attachments.filter(a => a.type === 'image');
    const others = attachments.filter(a => a.type !== 'image');
    const count = images.length;

    const gridCols = count === 1 ? 1 : count === 2 ? 2 : count <= 4 ? 2 : 3;
    const cellSize = count === 1 ? 260 : 120;

    return (
        <>
            {images.length > 0 && (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridCols}, ${cellSize}px)`,
                    gap: '2px',
                    borderRadius: '8px',
                    mt: '6px',
                    overflow: 'hidden',
                    mb: others.length > 0 ? 1 : 0,
                }}>
                    {images.map((att, i) => (
                        <Box
                            key={i}
                            component="img"
                            src={chatFileUrl(att.url)}
                            alt={att.name}
                            onClick={() => setLightbox(att.url)}
                            sx={{
                                width: `${cellSize}px`,
                                height: `${cellSize}px`,
                                objectFit: 'cover',
                                cursor: 'pointer',
                                display: 'block',
                            }}
                        />
                    ))}
                </Box>
            )}

            {others.map((att, i) => (
                att.type === 'video' ? (
                    <Box key={i} sx={{ mt: 0.5 }}>
                        <video
                            src={chatFileUrl(att.url)}
                            controls
                            style={{ maxWidth: 280, width: '100%', borderRadius: 12, display: 'block' }}
                        />
                    </Box>
                ) : (
                    <Box
                        key={i}
                        component="a"
                        href={chatFileUrl(att.url)}
                        download={att.name}
                        target="_blank"
                        rel="noreferrer"
                        sx={{
                            mt: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: '8px 12px',
                            mb: '6px',
                            borderRadius: '8px',
                            backgroundColor: fromMe ? 'rgba(255,255,255,0.15)' : 'background.level2',
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': { opacity: 0.8 },
                        }}
                    >
                        <File size={24} style={{ flexShrink: 0 }} />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography level="body-sm" noWrap sx={{ color: 'inherit', fontWeight: 600 }}>
                                {att.name}
                            </Typography>
                            {att.size && (
                                <Typography level="body-xs" sx={{ color: 'inherit', opacity: 0.65 }}>
                                    {formatFileSize(att.size)}
                                </Typography>
                            )}
                        </Box>
                        <DownloadSimple size={18} style={{ flexShrink: 0, opacity: 0.7 }} />
                    </Box>
                )
            ))}

            {lightbox && (
                <Modal open onClose={() => setLightbox(null)}>
                    <ModalDialog
                        sx={{
                            p: 0,
                            background: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => setLightbox(null)}
                    >
                        <img
                            src={chatFileUrl(lightbox)}
                            alt="full"
                            style={{ maxWidth: '95vw', maxHeight: '90vh', borderRadius: 16, display: 'block' }}
                            onClick={e => e.stopPropagation()}
                        />
                    </ModalDialog>
                </Modal>
            )}
        </>
    );
}

function ChatBubble2({ id, fromMe, content, attachments, created_at, edited, onEdit, onDelete, onReply, isGroup = false, senderUser = null, senderId = null, checkStatus, replyPreview, bookmark = false, forwardedFromUser = null, currentUserId = null }) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [hovered, setHovered] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [forwardModalOpen, setForwardModalOpen] = useState(false);

    const isEmojiOnly = (text) => {
        const value = text.trim();
        if (!value) return false;
        return /^[\p{Extended_Pictographic}\s]+$/u.test(value);
    };

    const emojiFontSize = (text) => {
        const len = text?.trim().length ?? 1;
        if (len <= 2) return '50px';
        if (len <= 4) return '40px';
        if (len <= 6) return '30px';
        return '26px';
    };

    const hasAttachments = attachments && attachments.length > 0;
    const onlyMedia = hasAttachments && !content?.trim() &&
        attachments.every(a => a.type === 'image' || a.type === 'video');

    const backgroundColor = () => {
        if (onlyMedia) return 'transparent';
        if (content && isEmojiOnly(content)) return 'transparent';
        return fromMe ? 'primary.500' : 'neutral.softBg';
    };

    const showTime = (time) => {
        const date = new Date(time);
        const now = new Date();

        const sameDay = date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate();

        const sameYear = date.getFullYear() === now.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;

        if (sameDay) {
            return timeStr;
        }

        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const day = date.getDate();
        const month = months[date.getMonth()];

        if (sameYear) {
            return `${day} ${month}, ${timeStr}`;
        }

        return `${day} ${month} ${date.getFullYear()} ${timeStr}`;
    };

    // Можно ли удалить у всех — только своё сообщение и не старше двух недель
    const canDeleteForEveryone = fromMe && (Date.now() - new Date(created_at).getTime()) < TWO_WEEKS_MS;

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteForMe = () => {
        setDeleteModalOpen(false);
        onDelete?.('for_me');
    };

    const handleDeleteForEveryone = () => {
        setDeleteModalOpen(false);
        onDelete?.('for_everyone');
    };

    return (
        <>
            <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: fromMe ? 'flex-end' : 'flex-start',
                    width: '100%',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {forwardedFromUser && (
                    <Box
                        component="a"
                        href={`/show/id/${forwardedFromUser.id}`}
                        onClick={e => e.stopPropagation()}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            gap: '6px',
                            my: 0.5,
                            ml: isGroup ? '32px' : '0px',
                            textDecoration: 'none !important',
                        }}
                    >
                        <Typography
                            level="body-xs"
                            sx={{
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: '12px',
                                textAlign: 'start'
                            }}
                        >
                            Переслано от
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 0.5,
                            textDecoration: 'none !important',
                        }}>
                            <Avatar
                                src={forwardedFromUser.avatar?.includes('http') ? forwardedFromUser.avatar : forwardedFromUser.avatar ? `${process.env.REACT_APP_API_URL}${forwardedFromUser.avatar}` : undefined}
                                alt={`${forwardedFromUser.firstName ?? ''} ${forwardedFromUser.lastName ?? ''}`}
                                size="sm"
                                sx={{ width: 20, height: 20, fontSize: 10 }}
                            />
                            <Typography
                                level="body-xs"
                                sx={{
                                    fontWeight: 600,
                                    maxWidth: 200,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {forwardedFromUser.firstName} {forwardedFromUser.lastName}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Box sx={{ position: 'relative', display: 'flex', alignItems: isGroup && !fromMe ? 'flex-end' : 'flex-start', gap: 0.5, flexDirection: fromMe ? 'row' : 'row-reverse' }}>

                    {/* Меню действий */}
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{
                                root: {
                                    variant: "plain",
                                    color: "neutral",
                                    size: "sm",
                                    sx: {
                                        width: '32px',
                                        height: '32px',
                                        minWidth: '32px',
                                        borderRadius: '50%',
                                        opacity: hovered ? 1 : 0,
                                        transition: 'opacity 0.2s',
                                        '&:focus': { opacity: 1 }
                                    }
                                }
                            }}
                        >
                            <DotsThreeVertical size={20} />
                        </MenuButton>

                        <Menu
                            placement={fromMe ? "left-start" : "right-start"}
                            sx={{
                                borderRadius: '12px',
                                border: 'none',
                                zIndex: 10000
                            }}
                        >
                            {fromMe && (
                                <MenuItem
                                    onClick={() => onEdit?.(content)}
                                    sx={{ py: 1, gap: '4px' }}
                                >
                                    <ListItemDecorator><PencilSimple size={20} /></ListItemDecorator>
                                    Изменить
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => onReply?.({ id, content, fromMe, senderUser })}
                                sx={{ py: 1, gap: '4px' }}
                            >
                                <ListItemDecorator><ArrowBendUpLeft size={20} /></ListItemDecorator>
                                Ответить
                            </MenuItem>
                            <MenuItem
                                onClick={() => setForwardModalOpen(true)}
                                sx={{ py: 1, gap: '4px' }}
                            >
                                <ListItemDecorator><ArrowBendDoubleUpRight size={20} /></ListItemDecorator>
                                Переслать
                            </MenuItem>
                            <MenuItem
                                onClick={() => navigator.clipboard.writeText(content)}
                                sx={{ py: 1, gap: '4px' }}
                            >
                                <ListItemDecorator><Copy size={20} /></ListItemDecorator>
                                Скопировать
                            </MenuItem>
                            {(!isGroup || fromMe) && (
                                <MenuItem
                                    color="danger"
                                    onClick={handleDeleteClick}
                                    sx={{ py: 1, gap: '4px' }}
                                >
                                    <ListItemDecorator><Trash size={20} /></ListItemDecorator>
                                    Удалить
                                </MenuItem>
                            )}
                        </Menu>
                    </Dropdown>

                    {/* Само облачко сообщения */}
                    <Box
                        sx={{
                            backgroundColor: backgroundColor(),
                            color: fromMe ? 'white' : 'text.primary',
                            p: onlyMedia && !replyPreview ? 0 : (content && !isEmojiOnly(content) ? '10px 16px' : (hasAttachments ? '10px 16px' : (replyPreview ? '10px 16px' : 0))),
                            maxWidth: isMobile ? '80vw' : '400px',
                            borderRadius: fromMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {isGroup && !fromMe && senderUser && (
                            <Box
                                component="a"
                                href={`/show/id/${senderUser.id}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    mb: '4px',
                                    textDecoration: 'none',
                                    minWidth: 0,
                                    maxWidth: 200,
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    noWrap
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.400',
                                        minWidth: 0,
                                    }}
                                >
                                    {senderUser.firstName} {senderUser.lastName}
                                </Typography>
                                {!!senderUser.verified && <VerifiedBadge size={12} />}
                            </Box>
                        )}

                        {replyPreview && (
                            <Box sx={(theme) => ({
                                display: 'flex',
                                borderLeft: `2px solid ${fromMe ? 'rgba(255,255,255,0.7)' : theme.palette.primary[400]}`,
                                pl: 1,
                                mb: 1,
                                mt: '2px',
                                opacity: 0.85,
                                maxWidth: '100%',
                                overflow: 'hidden',
                            })}>
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        color: 'inherit',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {replyPreview.content || 'Вложение'}
                                </Typography>
                            </Box>
                        )}
                        {hasAttachments && (
                            <AttachmentGrid attachments={attachments} fromMe={fromMe} />
                        )}
                        {content?.trim() ? (
                            <Typography
                                sx={{
                                    color: 'inherit',
                                    fontSize: !hasAttachments && isEmojiOnly(content) ? emojiFontSize(content) : '15px',
                                    lineHeight: 1.4,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    mt: hasAttachments ? 1 : 0,
                                }}
                            >
                                {content.trim()}
                            </Typography>
                        ) : null}
                    </Box>

                    {isGroup && !fromMe && (
                        <Box
                            component="a"
                            href={senderUser ? `/show/id/${senderUser.id}` : undefined}
                            sx={{ display: 'flex', flexShrink: 0, textDecoration: 'none !important' }}
                        >
                            <Avatar
                                src={senderUser?.avatar?.includes('http') ? senderUser.avatar : senderUser?.avatar ? `${process.env.REACT_APP_API_URL}${senderUser.avatar}` : undefined}
                                alt={`${senderUser?.firstName ?? ''} ${senderUser?.lastName ?? ''}`}
                                sx={{ width: 28, height: 28, fontSize: 12 }}
                            />
                        </Box>
                    )}

                </Box>

                {/* Время, пометка "изменено" и статус под сообщением */}
                <Box sx={{ display: 'flex', mt: '3px', gap: '2px', ml: isGroup ? '32px' : '2px', mr: '2px', alignItems: 'center' }}>
                    {edited ? (
                        <Typography level="body-xs" sx={{ opacity: 0.5, fontSize: '10px' }}>
                            изм. ·
                        </Typography>
                    ) : null}
                    <Typography
                        level="body-xs"
                        sx={{ opacity: 0.5, fontSize: '10px' }}
                    >
                        {showTime(created_at)}
                    </Typography>
                    {fromMe && checkStatus != null && !bookmark && (
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.25 }}>
                            {messageCheckStatus(checkStatus)}
                        </Box>
                    )}
                </Box>
            </MotionBox>

            <ModalForwardMessage
                open={forwardModalOpen}
                onClose={() => setForwardModalOpen(false)}
                content={content}
                attachments={attachments}
                forwardedFromId={fromMe ? currentUserId : (senderUser?.id ?? senderId)}
            />

            {/* Модалка удаления */}
            <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <ModalDialog
                    variant="outlined"
                    sx={{ borderRadius: '24px', maxWidth: 360, width: '90vw' }}
                >
                    <DialogTitle>Удалить сообщение?</DialogTitle>
                    <DialogContent>
                        {canDeleteForEveryone
                            ? 'Выберите, для кого удалить сообщение.'
                            : 'Сообщение будет удалено только у вас.'
                        }
                    </DialogContent>
                    <DialogActions sx={{ flexDirection: 'column', gap: 1 }}>
                        {canDeleteForEveryone && (
                            <Button
                                color="danger"
                                variant="solid"
                                fullWidth
                                onClick={handleDeleteForEveryone}
                                sx={{ borderRadius: "24px" }}
                            >
                                Удалить у всех
                            </Button>
                        )}
                        <Button
                            color="danger"
                            variant={canDeleteForEveryone ? 'outlined' : 'solid'}
                            fullWidth
                            onClick={handleDeleteForMe}
                            sx={{ borderRadius: "24px" }}
                        >
                            Удалить у себя
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            fullWidth
                            onClick={() => setDeleteModalOpen(false)}
                            sx={{ borderRadius: "24px" }}
                        >
                            Отмена
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal >
        </>
    );
}

export default ChatBubble2;
