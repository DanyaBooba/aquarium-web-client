import { AppProfile } from '../../components/app/App'
import { Sheet, Typography, Avatar, ListItem, ListItemDecorator, IconButton, Box, CircularProgress, Chip } from '@mui/joy'
import { SignIn, Info, X, NumpadIcon, DotIcon } from '@phosphor-icons/react'
import { useTheme } from '@mui/joy/styles';
import { useNotifications } from '../../hooks/profile/useNotifications';
import { useEffect, useState } from 'react';
import ServerError, { NotFound } from '../../components/module/ServerError/ServerError';
import { apiFetch } from '../../utils/apiClient';
import { AnimatePresence, motion } from 'framer-motion';

function Dot({ color = "#c41c1c", size = 128 }) {
    const radius = size / 2;
    const center = size / 2;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx={center} cy={center} r={radius} fill={color} />
        </svg>
    );
}

function NotificationItem({ icon, bgColor, title, description, date, readed = true, close = false, onDelete = () => { } }) {
    const handlerClose = () => onDelete();

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const formatted = date.toLocaleDateString('ru-RU', options);
        return formatted.replace(' г.', ' г. в');
    };

    return (
        <Sheet variant="plain" sx={{ borderRadius: '24px', p: 1, my: 2 }}>
            <ListItem sx={{ alignItems: 'flex-start', px: 2, gap: 2, py: 1.5 }}>
                <ListItemDecorator>
                    <Avatar sx={{ bgcolor: bgColor }} size="sm">
                        {icon}
                    </Avatar>
                </ListItemDecorator>

                <Box sx={{ flex: 1 }}>
                    <Typography
                        level="title-md"
                        fontWeight="md"
                        startDecorator={!readed && <Dot size={8} />}
                        sx={{
                            mb: '.5rem'
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography level="body-sm" color="neutral">
                        <span
                            dangerouslySetInnerHTML={{ __html: description }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.45rem',
                            }}
                        />
                    </Typography>
                    <Chip
                        color="primary"
                        size="sm"
                        variant="outlined"
                        sx={{ mt: '1rem' }}
                    >
                        {formatDate(date)}
                    </Chip>
                </Box>

                {close && (
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        onClick={handlerClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            mt: 0,
                            alignSelf: 'flex-start',
                            borderRadius: '50px',
                        }}
                    >
                        <X size={16} />
                    </IconButton>
                )}
            </ListItem>
        </Sheet>
    );
}

function NotificationShow({ id, type, jsonInfo, userId, created_at, readed, onDeleteLocal }) {
    const theme = useTheme();
    const list = ['auth', 'code', 'postPublish', 'postModerate'];

    if (!list.includes(type)) return null;

    const handlerDelete = async (id) => {
        onDeleteLocal(id);

        try {
            const response = await apiFetch(`/api/profile/notifications?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Ошибка при удалении");
        } catch (err) {
            console.error(err);
        }
    };

    const params = () => {
        switch (type) {
            case 'auth':
                return {
                    icon: <SignIn size={18} />,
                    bgColor: theme.colors.settings.profile,
                    title: 'Новый вход в аккаунт',
                    description: `<span>Кто-то вошел в ваш аккаунт с нового устройства.</span><span>Устройство: ${jsonInfo?.session?.browser}, ${jsonInfo?.session?.os} ${jsonInfo?.session?.osVersion}</span><span>Если это были не Вы, как можно скорее перейдите в <b>Настройки > Устройства</b> и завершите новый сеанс.</span>`,
                    date: created_at,
                    close: true
                }
            case 'code':
                return {
                    icon: <NumpadIcon size={18} />,
                    bgColor: theme.colors.settings.devices,
                    title: 'Код подтверждения',
                    description: `<span>Был запрошен код подтверждения.</span><span style='font-size: 18px; font-weight: 600; letter-spacing: 4px; font-family: monospace;'>${jsonInfo?.code ?? '—'}</span><span>Если это были не вы, проигнорируйте данное уведомление.</span>`,
                    date: created_at,
                    close: true
                }
            case 'postPublish':
                return {
                    icon: <Info size={18} />,
                    bgColor: theme.colors.settings.appearance,
                    title: 'Запись была опубликована',
                    description: "Ваша запись была опубликована и доступна по ссылке:<br/><br/><a href='https://dybka.ru'>https://dybka.ru</a>",
                    date: created_at,
                    close: true
                }
            case 'postModerate':
                return {
                    icon: <Info size={18} />,
                    bgColor: theme.colors.settings.appearance,
                    title: 'Запись находится на модерации',
                    description: "Ваша запись была отправлена на модерацию.",
                    date: created_at,
                    close: true
                }
            default:
                return {}
        }
    }

    return (
        <NotificationItem
            {...params()}
            onDelete={() => handlerDelete(id)}
            readed={readed ?? true}
        />
    )
}

function NotificationsList({ notifications = [], onDelete }) {
    if (notifications.length === 0) {
        return <NotFound title="Уведомления не найдены" img="mail.png" />;
    }

    return (
        <AnimatePresence initial={false}>
            {notifications.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <NotificationShow {...item} onDeleteLocal={onDelete} />
                </motion.div>
            ))}
        </AnimatePresence>
    );
}

export default function PageNotifications() {
    const { notifications: initialNotifications, loading, error } = useNotifications();
    const [list, setList] = useState([]);

    useEffect(() => {
        if (Array.isArray(initialNotifications)) {
            setList(initialNotifications);
        }
    }, [initialNotifications]);

    const handleDelete = (id) => {
        setList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <AppProfile title="Уведомления" desc="Все уведомления о событиях, связанных с вашим аккаунтом в социальной сети Аквариум">
            <Typography level="h4" my={2} sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                Уведомления
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : (
                <NotificationsList notifications={list} onDelete={handleDelete} />
            )}
        </AppProfile>
    );
}
