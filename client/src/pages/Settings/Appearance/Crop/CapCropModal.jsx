import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Modal, ModalDialog, Box, Button, Stack } from '@mui/joy'

import { getCroppedImg } from '../../../../utils/cropImage';
const CAP_ASPECT = 552 / 220

export default function CapCropModal({ open, image, onClose, onSave }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);;

    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels || !image) return;

        const blob = await getCroppedImg(image, croppedAreaPixels);
        const file = new File(
            [blob],
            'cap.jpg',
            { type: blob.type || 'image/jpeg' }
        );

        onSave(file);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                sx={{
                    width: 500,
                    borderRadius: '32px',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '552 / 220',
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}
                >
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={CAP_ASPECT}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </Box>

                <Stack direction="column" spacing={1} mt={2}>
                    <Button
                        onClick={handleSave}
                        sx={{
                            borderRadius: '50px',
                            py: 1.1,
                            width: '100%',
                        }}
                    >
                        Сохранить
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            borderRadius: '50px',
                            width: '100%',
                        }}
                    >
                        Отмена
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    )
}
