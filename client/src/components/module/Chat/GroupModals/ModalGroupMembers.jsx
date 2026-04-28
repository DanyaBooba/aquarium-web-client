import { useState, useEffect } from 'react';
import { Avatar, Box, CircularProgress, Modal, ModalDialog, Option, Select, Typography } from '@mui/joy';
import { Crown, Star } from '@phosphor-icons/react';
import VerifiedBadge from '../../../ui/VerifiedBadge';
import { apiFetch } from '../../../../utils/apiClient';

const API_URL = process.env.REACT_APP_API_URL ?? '';

function avatarSrc(avatar) {
    if (!avatar) return undefined;
    return avatar.includes('http') ? avatar : `${API_URL}${avatar}`;
}

export default function ModalGroupMembers({ open, onClose, chatId, currentUserId, onMembersUpdated }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(null);

    const currentMember = members.find(m => Number(m.userId) === Number(currentUserId));
    const isAdmin = currentMember?.userType === 100;

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        apiFetch(`/api/chats/group/${chatId}/members`)
            .then(r => r.json())
            .then(data => setMembers(data.members ?? []))
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }, [open, chatId]);

    const handleRoleChange = async (userId, newType) => {
        setSaving(userId);
        try {
            const updated = members.map(m => ({
                userId: m.userId,
                userType: Number(m.userId) === Number(userId) ? newType : m.userType,
            }));
            await apiFetch(`/api/chats/group/${chatId}/members`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users: updated }),
            });
            setMembers(prev =>
                prev.map(m => Number(m.userId) === Number(userId) ? { ...m, userType: newType } : m)
            );
            onMembersUpdated?.(updated);
        } finally {
            setSaving(null);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                sx={{
                    borderRadius: '32px',
                    p: 0,
                    maxWidth: 460,
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ p: 3, overflowY: 'auto', maxHeight: '90vh', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography level="h4" textAlign="center" mb={1}>
                        Участники
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress size="sm" />
                        </Box>
                    ) : members.map(m => (
                        <Box
                            key={m.userId}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                px: 1.5,
                                py: 1,
                                borderRadius: '999px',
                            }}
                        >
                            <Avatar
                                component="a"
                                href={`/show/id/${m.id}`}
                                src={avatarSrc(m.avatar)}
                                alt={`${m.firstName ?? ''} ${m.lastName ?? ''}`}
                                size="sm"
                                sx={{ flexShrink: 0, textDecoration: 'none' }}
                            />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                                    <Typography
                                        level="title-sm"
                                        component="a"
                                        href={`/show/id/${m.id}`}
                                        noWrap
                                        sx={{ minWidth: 0, textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {m.firstName} {m.lastName}
                                    </Typography>
                                    {!!m.verified && <VerifiedBadge size={14} />}
                                </Box>
                                {m.username && (
                                    <Typography level="body-xs" color="neutral" noWrap>
                                        @{m.username}
                                    </Typography>
                                )}
                            </Box>

                            {m.userType === 100 && !isAdmin && (
                                <Star weight='fill' size={16} color="var(--joy-palette-warning-500)" style={{ flexShrink: 0 }} />
                            )}

                            {isAdmin && Number(m.userId) !== Number(currentUserId) && (
                                <Select
                                    size="sm"
                                    value={m.userType}
                                    disabled={saving === m.userId}
                                    onChange={(_, v) => handleRoleChange(m.userId, v)}
                                    sx={{
                                        boxShadow: 'none',
                                        borderRadius: '99px',
                                    }}
                                    slotProps={{
                                        listbox: {
                                            sx: {
                                                borderRadius: '12px',
                                            },
                                        },
                                    }}
                                >
                                    <Option value={1}>Участник</Option>
                                    <Option value={100}>Администратор</Option>
                                </Select>
                            )}

                            {isAdmin && Number(m.userId) === Number(currentUserId) && (
                                <Star weight='fill' size={16} color="var(--joy-palette-warning-500)" style={{ flexShrink: 0 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            </ModalDialog>
        </Modal>
    );
}
