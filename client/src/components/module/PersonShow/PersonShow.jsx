import { useState } from 'react';
import { ListItemButton, Typography, Avatar, Box, IconButton } from '@mui/joy'
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { ChatCircle, UserCheck, UserPlus } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../utils/apiClient';
import { useIsOnline } from '../../app/OnlineProvider';
import VerifiedBadge from '../../ui/VerifiedBadge';

function PersonShow({ user }) {
    const navigate = useNavigate();
    const [follow, setFollow] = useState(user?.follow ?? false);
    const [loading, setLoading] = useState(false);
    const isOnline = useIsOnline(user?.id);

    const handleSubscribeToggle = async (e) => {
        e.stopPropagation();

        try {
            setLoading(true);

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) navigate('/auth');

            const method = follow ? "DELETE" : "POST";
            const res = await apiFetch(`/api/user/follow/${user?.id}`, {
                method,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!res.ok) throw new Error("Ошибка при изменении подписки");

            const data = await res.json();
            setFollow(data?.follow ?? false);
        } catch (err) {
            console.error("Ошибка при подписке/отписке:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClickMessage = (e) => {
        e.stopPropagation();
        navigate(`/chat/${user?.id}`)
    }

    const handleClick = () => {
        navigate(`/show/id/${user?.id}`);
    };

    return (
        <ListItemButton
            sx={{ p: 1.5, borderRadius: '24px' }}
            onClick={handleClick}
        >
            <Badge
                invisible={!isOnline}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeInset="14%"
                color="success"
                sx={{
                    [`& .${badgeClasses.badge}`]: {
                        '&::after': {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: 'background.surface',
                            boxSizing: 'content-box',
                            transform: 'translate(-2px, -2px) !important',
                            content: '""',
                        },
                    },
                }}
            >
                <Avatar src={user?.avatar?.includes('http') ? user?.avatar : `${process.env.REACT_APP_API_URL}${user?.avatar}`} size="md" />
            </Badge>

            <Box
                sx={{
                    ml: 1,
                    mr: 1,
                    minWidth: 0,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                    <Typography
                        level="body-lg"
                        noWrap
                        sx={{ minWidth: 0 }}
                    >
                        {user?.firstName}{' '}{user?.lastName}
                    </Typography>
                    {!!user?.verified && <VerifiedBadge size={16} />}
                </Box>

                {user?.description && (
                    <Typography
                        level="body-sm"
                        textColor="neutral.500"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {user?.description}
                    </Typography>
                )}
            </Box>

            <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'row', gap: 1 }}>
                {!user?.itsme && (
                    <IconButton
                        size="sm"
                        variant={follow ? 'plain' : 'soft'}
                        color={follow ? 'neutral' : 'primary'}
                        onClick={handleSubscribeToggle}
                        sx={{
                            borderRadius: '50%',
                        }}
                    >
                        {follow ? <UserCheck size={18} /> : <UserPlus size={18} />}
                    </IconButton>
                )}
                <IconButton
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={handleClickMessage}
                    sx={{
                        borderRadius: '50%',
                    }}
                >
                    <ChatCircle size={18} />
                </IconButton>
            </Box>
        </ListItemButton>

    )
}

export default PersonShow
