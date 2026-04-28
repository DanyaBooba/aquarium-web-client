import { Box, Button, Modal, ModalDialog, Typography, Avatar } from "@mui/joy";
import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { Image } from "@phosphor-icons/react";
import { apiFetch } from '../../../../utils/apiClient';

export default function ModalGroupChatImage({ open, onClose, chatId, currentImage, onImageUpdated }) {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setError('');
    };

    const handleUpload = async () => {
        if (!file || submitting) return;
        setSubmitting(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('files', file);

            const res = await apiFetch(`/api/chats/group/${chatId}/image`, {
                method: 'PATCH',
                body: formData,
            });
            const data = await res.json();

            if (!res.ok || !data?.success) {
                setError(data?.error ?? 'Ошибка при загрузке');
                return;
            }

            onImageUpdated(data.image);
            handleClose();
        } catch {
            setError('Ошибка при загрузке');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setPreview(null);
        setFile(null);
        setError('');
        onClose();
    };

    const imageToShow = preview || (currentImage ? `${process.env.REACT_APP_API_URL ?? ''}${currentImage}` : null);

    return (
        <Modal open={open} onClose={handleClose}>
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
                    alignItems: 'center',
                }}
            >
                <Typography level="h4" sx={{ textAlign: 'center' }}>Фото группы</Typography>

                <Box
                    onClick={() => inputRef.current?.click()}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: 120,
                        height: 120,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'neutral.100',
                        border: '2px dashed',
                        borderColor: 'neutral.300',
                        position: 'relative',
                        '&:hover .overlay': { opacity: 1 },
                    }}
                >
                    {imageToShow ? (
                        <Avatar src={imageToShow} sx={{ width: 120, height: 120 }} />
                    ) : (
                        <Image size={40} color="var(--joy-palette-neutral-400)" />
                    )}
                    <Box
                        className="overlay"
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            borderRadius: '50%',
                        }}
                    >
                        <Image size={28} color="white" />
                    </Box>
                </Box>

                <Typography level="body-sm" color="neutral" sx={{ textAlign: 'center' }}>
                    Нажмите, чтобы выбрать фото
                </Typography>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {error && (
                    <Typography level="body-sm" color="danger" sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                    <Button
                        onClick={handleUpload}
                        disabled={!file || submitting}
                        loading={submitting}
                        sx={{ width: '100%', borderRadius: '50px', py: 1.5 }}
                    >
                        Сохранить
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
            </ModalDialog>
        </Modal>
    );
}
