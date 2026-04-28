import { Box, Button, Modal, ModalDialog, Typography } from "@mui/joy";
import { useState } from "react";
import CodeInput from "../../../components/module/CodeInput/CodeInput";
import { motion } from 'framer-motion';

export default function ModalCode({ openModal = false, setOpenModal = () => { } }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCodeSubmit = async (code) => {
        // console.log('Введенный код', code)
    }

    return (
        <Modal
            open={openModal}
            onClose={() => { }}
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
                }}
            >
                <Box sx={{ mb: 6 }}>
                    <Typography level="h4" textAlign="center" mb={2}>
                        Введите код
                    </Typography>
                    <Typography
                        level="body-md"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '300px',
                            mx: 'auto'
                        }}
                    >
                        На вашу почту был отправлен <nobr>6-значный</nobr> код
                    </Typography>
                </Box>
                <Box sx={{ mb: 8 }}>
                    <CodeInput
                        callback={handleCodeSubmit}
                        setError={setError}
                        loading={loading}
                        error={error}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenModal(false)}
                        sx={{
                            width: '100%',
                            borderRadius: '50px'
                        }}
                    >
                        Отмена
                    </Button>
                </Box>
            </ModalDialog>
        </Modal >
    )
}
