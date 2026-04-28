import {
    Box, Button, Modal, ModalDialog, Typography,
    Input, Avatar, CircularProgress
} from "@mui/joy";
import { useState, useEffect } from "react";
import { UsersThree, MagnifyingGlass, CaretLeft, Check } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';

export default function ModalCreateGroupChat({ openModal, setOpenModal }) {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!openModal || step !== 2) return;

        setLoadingUsers(true);
        apiFetch('/api/users', { method: 'GET' })
            .then(r => r.json())
            .then(data => setAllUsers(data?.users ?? []))
            .catch(() => setAllUsers([]))
            .finally(() => setLoadingUsers(false));
    }, [openModal, step]);

    const handleClose = () => {
        setOpenModal(false);
        setStep(1);
        setTitle('');
        setQuery('');
        setSelectedUsers([]);
        setError('');
    };

    const filteredUsers = allUsers.filter(u => {
        if (!query.trim()) return true;
        const words = query.toLowerCase().trim().split(/\s+/);
        const full = `${u.firstName ?? ''} ${u.lastName ?? ''} ${u.username ?? ''}`.toLowerCase();
        return words.every(w => full.includes(w));
    });

    const toggleUser = (user) => {
        setSelectedUsers(prev => {
            const exists = prev.some(u => u.id === user.id);
            return exists ? prev.filter(u => u.id !== user.id) : [...prev, user];
        });
    };

    const isSelected = (userId) => selectedUsers.some(u => u.id === userId);

    const handleCreate = async () => {
        if (submitting) return;

        setSubmitting(true);
        setError('');

        try {
            const response = await apiFetch('/api/chats/group', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: title.trim(),
                    image: null,
                    userIds: selectedUsers.map(u => u.id),
                }),
            });

            const data = await response.json();

            if (!response.ok || !data?.success) {
                setError(data?.error ?? 'Ошибка при создании чата');
                return;
            }

            handleClose();
            navigate(`/chat/g/${data.chatId}`, { state: { direction: 1 } });
        } catch {
            setError('Ошибка при создании чата');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal open={openModal} onClose={handleClose}>
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

                    {step === 1 && (
                        <>
                            <Box sx={{ textAlign: 'center', mb: 1 }}>
                                <UsersThree
                                    size={48}
                                    weight="fill"
                                    style={{ color: 'var(--joy-palette-primary-500)', marginBottom: 12 }}
                                />
                                <Typography level="h4" mb={0.5}>Новый групповой чат</Typography>
                                <Typography level="body-md" color="neutral">
                                    Придумайте название для вашей группы
                                </Typography>
                            </Box>

                            <Input
                                placeholder="Название группы"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && title.trim() && setStep(2)}
                                autoFocus
                                sx={{ borderRadius: '999px', px: 2, py: 1.5, boxShadow: 'none' }}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                                <Button
                                    onClick={() => setStep(2)}
                                    disabled={!title.trim()}
                                    sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                                >
                                    Далее
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleClose}
                                    sx={{ width: '100%', borderRadius: '50px', py: 1 }}
                                >
                                    Отмена
                                </Button>
                            </Box>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    onClick={() => setStep(1)}
                                    startDecorator={<CaretLeft size={16} />}
                                    sx={{ borderRadius: '50px', px: 1.5 }}
                                >
                                    Назад
                                </Button>
                                <Typography
                                    level="title-md"
                                    noWrap
                                    sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}
                                >
                                    {title}
                                </Typography>
                            </Box>

                            <Typography level="body-sm" color="neutral" textAlign="center">
                                Выберите участников группы
                            </Typography>

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
                                    minHeight: '50px'
                                }}
                            />

                            <Box
                                sx={{
                                    maxHeight: '200px',
                                    minHeight: '200px',
                                    overflow: 'hidden',
                                    overflowY: 'scroll',
                                }}
                            >
                                {loadingUsers ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                        <CircularProgress size="sm" />
                                    </Box>
                                ) : filteredUsers.length === 0 ? (
                                    <Typography level="body-sm" color="neutral" sx={{ textAlign: 'center', py: 2 }}>
                                        Пользователи не найдены
                                    </Typography>
                                ) : (
                                    filteredUsers.map(u => (
                                        <Box
                                            key={u.id}
                                            onClick={() => toggleUser(u)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                px: 1.5,
                                                py: 1,
                                                borderRadius: '999px',
                                                cursor: 'pointer',
                                                backgroundColor: isSelected(u.id) ? 'primary.softBg' : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: isSelected(u.id) ? 'primary.softHoverBg' : 'neutral.softHoverBg'
                                                },
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
                                                </Typography>
                                                {u.username && (
                                                    <Typography level="body-xs" color="neutral" noWrap>
                                                        @{u.username}
                                                    </Typography>
                                                )}
                                            </Box>
                                            {isSelected(u.id) && (
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
                                    ))
                                )}
                            </Box>

                            {error && (
                                <Typography level="body-sm" color="danger" sx={{ textAlign: 'center' }}>
                                    {error}
                                </Typography>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                                <Button
                                    onClick={handleCreate}
                                    disabled={selectedUsers.length === 0 || submitting}
                                    loading={submitting}
                                    sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                                >
                                    Создать чат {selectedUsers.length > 0 && `(${selectedUsers.length})`}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleClose}
                                    sx={{ width: '100%', borderRadius: '50px', py: 1 }}
                                >
                                    Отмена
                                </Button>
                            </Box>
                        </>
                    )}

                </Box>
            </ModalDialog>
        </Modal>
    );
}
