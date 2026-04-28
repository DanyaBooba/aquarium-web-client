import { Box, Button, Modal, ModalDialog, Typography, Input, Avatar, CircularProgress } from "@mui/joy";
import { useState, useEffect } from "react";
import { MagnifyingGlass, Check } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../../utils/apiClient';

export default function ModalAddMembers({ open, onClose, chatId, groupMembers = [], onMembersUpdated }) {
    const [query, setQuery] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    // selectedIds — Set userId'ов, которые должны быть в группе после сохранения
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!open) return;
        setQuery('');
        setError('');
        // Предзаполняем текущими участниками
        setSelectedIds(new Set(groupMembers.map(m => m.userId)));

        setLoadingUsers(true);
        apiFetch('/api/users', { method: 'GET' })
            .then(r => r.json())
            .then(data => setAllUsers(data?.users ?? []))
            .catch(() => setAllUsers([]))
            .finally(() => setLoadingUsers(false));
    }, [open]);

    const filteredUsers = allUsers.filter(u => {
        if (!query.trim()) return true;
        const words = query.toLowerCase().trim().split(/\s+/);
        const full = `${u.firstName ?? ''} ${u.lastName ?? ''} ${u.username ?? ''}`.toLowerCase();
        return words.every(w => full.includes(w));
    });

    const toggle = (userId) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(userId)) {
                next.delete(userId);
            } else {
                next.add(userId);
            }
            return next;
        });
    };

    // Администраторы — нельзя снять выделение
    const adminIds = new Set(groupMembers.filter(m => m.userType === 100).map(m => m.userId));

    const handleSave = async () => {
        if (submitting) return;

        setSubmitting(true);
        setError('');

        try {
            // Восстанавливаем userType для каждого участника
            const memberMap = new Map(groupMembers.map(m => [m.userId, m.userType]));
            const users = [...selectedIds].map(userId => ({
                userId,
                userType: memberMap.get(userId) ?? 1,
            }));

            const res = await apiFetch(`/api/chats/group/${chatId}/members`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users }),
            });
            const data = await res.json();

            if (!res.ok || !data?.success) {
                setError(data?.error ?? 'Ошибка при сохранении');
                return;
            }

            onMembersUpdated(users);
            onClose();
        } catch {
            setError('Ошибка при сохранении');
        } finally {
            setSubmitting(false);
        }
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
                    <Typography level="h4" sx={{ textAlign: 'center' }}>Участники группы</Typography>

                    <Input
                        placeholder="Поиск..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        startDecorator={<MagnifyingGlass size={16} />}
                        sx={{
                            borderRadius: '999px',
                            px: 2,
                            py: 1.5,
                            boxShadow: 'none',
                            minHeight: '50px',
                        }}
                    />

                    <Box sx={{
                        height: '100%',
                        maxHeight: '400px',
                        minHeight: '200px',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                    }}>
                        {loadingUsers ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                <CircularProgress size="sm" />
                            </Box>
                        ) : filteredUsers.length === 0 ? (
                            <Typography level="body-sm" color="neutral" sx={{ textAlign: 'center', py: 2 }}>
                                Пользователи не найдены
                            </Typography>
                        ) : (
                            filteredUsers.map(u => {
                                const selected = selectedIds.has(u.id);
                                const isAdmin = adminIds.has(u.id);

                                return (
                                    <Box
                                        key={u.id}
                                        onClick={() => !isAdmin && toggle(u.id)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: '999px',
                                            cursor: isAdmin ? 'default' : 'pointer',
                                            backgroundColor: selected ? 'primary.softBg' : 'transparent',
                                            '&:hover': !isAdmin ? {
                                                backgroundColor: selected ? 'primary.softHoverBg' : 'neutral.softHoverBg',
                                            } : {},
                                        }}
                                    >
                                        <Avatar
                                            src={u.avatar?.includes('http') ? u.avatar : u.avatar ? `${process.env.REACT_APP_API_URL}${u.avatar}` : undefined}
                                            alt={`${u.firstName} ${u.lastName}`}
                                            size="sm"
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography level="title-sm" noWrap>
                                                {u.firstName} {u.lastName}
                                                {isAdmin && (
                                                    <Typography component="span" level="body-xs" color="primary" sx={{ ml: 0.5 }}>
                                                        админ
                                                    </Typography>
                                                )}
                                            </Typography>
                                            {u.username && (
                                                <Typography level="body-xs" color="neutral" noWrap>
                                                    @{u.username}
                                                </Typography>
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

                    {error && (
                        <Typography level="body-sm" color="danger" sx={{ textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                            onClick={handleSave}
                            disabled={submitting}
                            loading={submitting}
                            sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                        >
                            Сохранить
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
