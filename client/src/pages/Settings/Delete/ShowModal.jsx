import { Box, Button, Modal, ModalDialog, Typography, List, ListItem, Switch } from "@mui/joy";
import { useState, useEffect } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { apiFetch } from '../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';

export default function ShowModal({ openModal = false, setOpenModal = () => { } }) {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(5);
    const [canDelete, setCanDelete] = useState(false);
    const [deleteMessages, setDeleteMessages] = useState(false);

    useEffect(() => {
        if (!openModal) {
            setTimeLeft(5);
            setCanDelete(false);
            return;
        }

        if (timeLeft <= 0) {
            setCanDelete(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, openModal]);

    const handleDelete = () => {

        const fetchDelete = async () => {
            try {
                const response = await apiFetch('/api/profile', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE',
                    body: JSON.stringify({
                        deleteMessages: deleteMessages
                    })
                });

                const data = await response.json();

                if (data.status) {
                    localStorage.removeItem('accessToken');
                    navigate('/feed', { replace: true });
                }

                if (!response.ok) {
                    throw new Error('Ошибка удаления профиля');
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchDelete();
        setOpenModal(false);
    };

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <ModalDialog
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                sx={{
                    borderRadius: '32px',
                    transform: 'translate(-50%, -50%) !important',
                    maxWidth: '450px',
                    p: 3
                }}
            >
                <Box sx={{ overflow: 'scroll' }}>
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                        <WarningCircle
                            size={48}
                            weight="fill"
                            style={{
                                color: 'var(--joy-palette-danger-500)',
                                marginBottom: '16px'
                            }}
                        />
                        <Typography level="h4" mb={2}>
                            Подтвердите удаление аккаунта
                        </Typography>
                        <Typography level="body-md" color="neutral">
                            После удаления аккаунта будут безвозвратно потеряны следующие данные без возможности восстановления:
                        </Typography>
                    </Box>

                    <List
                        marker="disc"
                        sx={{
                            mb: 3,
                            pl: 2,
                        }}
                    >
                        <ListItem>
                            <Typography level="body-md">Профиль и личные данные</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography level="body-md">Все публикации</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography level="body-md">Ваши комментарии</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography level="body-md">Медиафайлы</Typography>
                        </ListItem>
                    </List>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '2rem' }}>
                        <Typography>Удалить сообщения</Typography>
                        <Switch
                            color={deleteMessages ? 'danger' : 'neutral'}
                            checked={deleteMessages}
                            onChange={() => setDeleteMessages(!deleteMessages)}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                            color="danger"
                            onClick={handleDelete}
                            disabled={!canDelete}
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                py: 1.5
                            }}
                        >
                            Подтвердить удаление
                            {timeLeft ? ` ${timeLeft}` : ''}
                        </Button>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setOpenModal(false)}
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                py: 1.5
                            }}
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}
