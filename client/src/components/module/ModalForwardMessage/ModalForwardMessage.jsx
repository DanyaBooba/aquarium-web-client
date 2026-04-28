import {
    Box, Button, Modal, ModalDialog, Typography,
    Input, Avatar, CircularProgress
} from "@mui/joy";
import { useState, useEffect } from "react";
import { MagnifyingGlass, Check, UsersThree } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../utils/apiClient';

export default function ModalForwardMessage({ open, onClose, content, attachments, forwardedFromId }) {
    const [query, setQuery] = useState('');
    const [chats, setChats] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (!open) return;
        setQuery('');
        setSelectedIds([]);

        setLoading(true);
        apiFetch('/api/chats', { method: 'GET' })
            .then(r => r.json())
            .then(data => setChats(data?.chats ?? []))
            .catch(() => setChats([]))
            .finally(() => setLoading(false));
    }, [open]);

    const filtered = chats.filter(chat => {
        if (!query.trim()) return true;
        const words = query.toLowerCase().trim().split(/\s+/);
        const name = chat.isGroup
            ? (chat.chatName ?? '').toLowerCase()
            : `${chat.user?.firstName ?? ''} ${chat.user?.lastName ?? ''} ${chat.user?.username ?? ''}`.toLowerCase();
        return words.every(w => name.includes(w));
    });

    const toggle = (chat) => {
        const key = chat.isGroup ? `g_${chat.id}` : `u_${chat.user?.id}`;
        setSelectedIds(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const isSelected = (chat) => {
        const key = chat.isGroup ? `g_${chat.id}` : `u_${chat.user?.id}`;
        return selectedIds.includes(key);
    };

    const handleForward = async () => {
        if (sending || selectedIds.length === 0) return;
        setSending(true);

        const selected = chats.filter(c => isSelected(c));
        await Promise.allSettled(selected.map(chat => {
            const formData = new FormData();
            if (content) formData.append('content', content);
            if (forwardedFromId) formData.append('forwardedFromId', forwardedFromId);
            if (attachments?.length) formData.append('attachmentsJson', JSON.stringify(attachments));
            if (chat.isGroup) {
                return apiFetch(`/api/chats/group/${chat.id}/send`, { method: 'POST', body: formData });
            } else {
                return apiFetch(`/api/messages/${chat.user?.id}/send`, { method: 'POST', body: formData });
            }
        }));

        setSending(false);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                sx={{
                    borderRadius: '32px',
                    transform: 'translate(-50%, -50%) !important',
                    width: '100%',
                    maxWidth: '460px',
                    p: 0,
                    maxHeight: '90vh',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ overflowY: 'auto', maxHeight: '90vh', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography level="h4" textAlign="center">Переслать сообщение</Typography>

                    <Input
                        placeholder="Поиск чатов..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        startDecorator={<MagnifyingGlass size={16} />}
                        sx={{ borderRadius: '999px', px: 2, py: 1.5, boxShadow: 'none', minHeight: '50px' }}
                    />

                    <Box sx={{ maxHeight: '280px', minHeight: '200px', overflowY: 'auto' }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                <CircularProgress size="sm" />
                            </Box>
                        ) : filtered.length === 0 ? (
                            <Typography level="body-sm" color="neutral" sx={{ textAlign: 'center', py: 2 }}>
                                Чаты не найдены
                            </Typography>
                        ) : (
                            filtered.map(chat => {
                                const selected = isSelected(chat);
                                const avatarSrc = chat.isGroup
                                    ? (chat.chatImage?.startsWith('http') ? chat.chatImage : chat.chatImage ? `${process.env.REACT_APP_API_URL}${chat.chatImage}` : undefined)
                                    : (chat.user?.avatar?.includes('http') ? chat.user?.avatar : chat.user?.avatar ? `${process.env.REACT_APP_API_URL}${chat.user?.avatar}` : undefined);
                                const name = chat.isGroup
                                    ? (chat.chatName ?? 'Групповой чат')
                                    : `${chat.user?.firstName ?? ''} ${chat.user?.lastName ?? ''}`.trim();
                                const sub = chat.isGroup
                                    ? `${chat.users?.length ?? ''} участников`
                                    : (chat.user?.username ? `@${chat.user.username}` : '');

                                return (
                                    <Box
                                        key={chat.isGroup ? `g_${chat.id}` : `u_${chat.user?.id}`}
                                        onClick={() => toggle(chat)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            px: 1.5,
                                            py: 1,
                                            borderRadius: '999px',
                                            cursor: 'pointer',
                                            backgroundColor: selected ? 'primary.softBg' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: selected ? 'primary.softHoverBg' : 'neutral.softHoverBg'
                                            },
                                        }}
                                    >
                                        {chat.isGroup && !avatarSrc ? (
                                            <Box sx={(theme) => ({
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                flexShrink: 0,
                                                backgroundColor: theme.palette.primary[500],
                                            })}>
                                                <UsersThree size={16} color="white" weight="fill" />
                                            </Box>
                                        ) : (
                                            <Avatar src={avatarSrc} alt={name} size="sm" />
                                        )}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography level="title-sm" noWrap>{name}</Typography>
                                            {sub && (
                                                <Typography level="body-xs" color="neutral" noWrap>{sub}</Typography>
                                            )}
                                        </Box>
                                        {selected && (
                                            <Box sx={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: 'primary.500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <Check size={12} color="white" weight="bold" />
                                            </Box>
                                        )}
                                    </Box>
                                );
            })
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                        <Button
                            onClick={handleForward}
                            disabled={selectedIds.length === 0 || sending}
                            loading={sending}
                            sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                        >
                            Переслать {selectedIds.length > 0 && `(${selectedIds.length})`}
                        </Button>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={onClose}
                            sx={{ width: '100%', borderRadius: '50px', py: 1 }}
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
}
