import { Box, Button, Modal, ModalDialog, Typography } from "@mui/joy";
import { useState, useEffect, useRef } from "react";
import { Warning } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';

const COUNTDOWN = 5;

export default function ModalDeleteGroup({ open, onClose, chatId }) {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(COUNTDOWN);
    const [submitting, setSubmitting] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!open) {
            setSeconds(COUNTDOWN);
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [open]);

    const handleDelete = async () => {
        if (submitting || seconds > 0) return;

        setSubmitting(true);
        try {
            const res = await apiFetch(`/api/chats/group/${chatId}`, { method: 'DELETE' });
            const data = await res.json();

            if (!res.ok || !data?.success) return;

            navigate('/messages', { state: { direction: -1 } });
        } catch {
            // silent
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
                    textAlign: 'center',
                }}
            >
                <Box>
                    <Warning
                        size={48}
                        weight="fill"
                        style={{ color: 'var(--joy-palette-danger-500)', marginBottom: 12 }}
                    />
                    <Typography level="h4" mb={0.5}>Удалить группу?</Typography>
                    <Typography level="body-md" color="neutral">
                        Группа и все сообщения будут удалены безвозвратно.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                        color="danger"
                        onClick={handleDelete}
                        disabled={seconds > 0 || submitting}
                        loading={submitting}
                        sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                    >
                        {seconds > 0 ? `Удалить группу ${seconds}` : 'Удалить группу'}
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
