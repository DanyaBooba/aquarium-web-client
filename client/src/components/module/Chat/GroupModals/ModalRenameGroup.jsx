import { Box, Button, Modal, ModalDialog, Typography, Input } from "@mui/joy";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../../utils/apiClient';

export default function ModalRenameGroup({ open, onClose, chatId, currentName, onRenamed }) {
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setName(currentName ?? '');
            setError('');
        }
    }, [open, currentName]);

    const handleSave = async () => {
        if (!name.trim() || submitting) return;

        setSubmitting(true);
        setError('');

        try {
            const res = await apiFetch(`/api/chats/group/${chatId}/name`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            });
            const data = await res.json();

            if (!res.ok || !data?.success) {
                setError(data?.error ?? 'Ошибка при сохранении');
                return;
            }

            onRenamed(name.trim());
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
                    maxWidth: '400px',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography level="h4" sx={{ textAlign: 'center' }}>Изменить название</Typography>

                <Input
                    placeholder="Название группы"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                    autoFocus
                    sx={{ borderRadius: '999px', px: 2, py: 1.5, boxShadow: 'none' }}
                />

                {error && (
                    <Typography level="body-sm" color="danger" sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                        onClick={handleSave}
                        disabled={!name.trim() || name.trim() === currentName || submitting}
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
            </ModalDialog>
        </Modal>
    );
}
