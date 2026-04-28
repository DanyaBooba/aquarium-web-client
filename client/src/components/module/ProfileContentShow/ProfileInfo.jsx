import {
    Typography,
    Box,
    Stack,
    Card,
    CardContent,
    Modal,
    ModalDialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/joy';
import { X } from '@phosphor-icons/react';
import { useState } from 'react';
import PersonShow from '../PersonShow/PersonShow';
import { apiFetch } from '../../../utils/apiClient';

function ProfileInfo({ countSubs, countSub, countPosts, userId, setTab }) {
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'subs' | 'sub'
    const [subscribers, setSubscribers] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);

    const scrollToPosts = () => {
        const el = document.getElementById('posts');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            const url = new URL(window.location);
            url.hash = 'posts';
            window.history.replaceState(null, '', url);
        }
    };

    const handleClick = async (type, count) => {
        if (count === 0) return;

        if (type === 'posts') {
            setTab('posts');
            scrollToPosts();
            return;
        }

        setModalType(type);
        setOpen(true);

        // Проверка кеша
        if (type === 'subs' && subscribers !== null) return;
        if (type === 'sub' && subscriptions !== null) return;

        try {
            const res = await apiFetch(`/api/users/${userId}/${type}`, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });

            if (!res.ok) throw new Error('Ошибка при запросе');

            const data = await res.json();
            if (type === 'subs') {
                setSubscribers(data?.users || []);
            } else {
                setSubscriptions(data?.users || []);
            }
        } catch (err) {
            console.error('Ошибка при загрузке пользователей:', err);
            if (type === 'subs') {
                setSubscribers([]);
            } else {
                setSubscriptions([]);
            }
        }
    };

    const items = [
        { count: countSubs, label: 'подписчики', type: 'subs' },
        { count: countSub, label: 'подписки', type: 'sub' },
        { count: countPosts, label: 'записи', type: 'posts' }
    ];

    const users = modalType === 'subs' ? subscribers : subscriptions;

    return (
        <>
            <Card variant="plain" sx={{ mt: 3, borderRadius: '999px' }}>
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        textAlign="center"
                        sx={{
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        {items.map(({ count, label, type }, i) => {
                            const isDisabled = count === 0;

                            return (
                                <Box
                                    key={i}
                                    role="button"
                                    tabIndex={isDisabled ? -1 : 0}
                                    aria-disabled={isDisabled}
                                    onClick={() => !isDisabled && handleClick(type, count)}
                                    onKeyDown={(e) => {
                                        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                                            e.preventDefault();
                                            handleClick(type, count);
                                        }
                                    }}
                                    sx={{
                                        flex: '1 1 75px',
                                        minWidth: 75,
                                        textAlign: 'center',
                                        cursor: isDisabled ? 'default' : 'pointer',
                                        color: isDisabled ? 'text.tertiary' : 'inherit',
                                        pointerEvents: isDisabled ? 'none' : 'auto',
                                        outline: 'none',
                                        '&:focus': {
                                            boxShadow: !isDisabled ? '0 0 0 2px var(--joy-palette-primary-outlinedBorder)' : 'none',
                                            borderRadius: '8px',
                                        },
                                    }}
                                >
                                    <Typography level="title-lg">{count}</Typography>
                                    <Typography
                                        level="body-sm"
                                        textColor="text.tertiary"
                                        sx={{
                                            fontSize: '12px'
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </CardContent>
            </Card>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    layout="center"
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        borderRadius: '32px',
                        border: 'none',
                        p: 3,
                        '@media (max-width: 540px)': {
                            maxWidth: 'calc(100% - 40px)',
                        },
                    }}
                >
                    <DialogTitle>
                        {modalType === 'subs' ? 'Подписчики' : 'Подписки'}
                    </DialogTitle>
                    <IconButton
                        aria-label="Закрыть"
                        onClick={() => setOpen(false)}
                        variant="plain"
                        color="neutral"
                        sx={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            borderRadius: '50px'
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                    <DialogContent sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {users?.length > 0 ? (
                            <Stack spacing={1}>
                                {users.map(user => <PersonShow user={user} key={user?.id} />)}
                            </Stack>
                        ) : (
                            <Typography level="body-sm" textColor="text.tertiary">
                                Список пуст.
                            </Typography>
                        )}
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default ProfileInfo;
