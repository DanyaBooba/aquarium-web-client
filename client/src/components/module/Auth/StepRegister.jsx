import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, FormControl, Button, Box, Typography, IconButton, Checkbox, Link } from '@mui/joy';
import { AuthTitle, DisplayError } from './Modules';
import { variantsPassword } from './animate';
import { Pencil } from '@phosphor-icons/react';
import ModalPrivacyContent from '../ModalPrivacyContent/ModalPrivacyContent';
import { apiFetch } from '../../../utils/apiClient';

function StepRegister({ direction, email, handleEditEmail }) {
    const [agreed, setAgreed] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState('');

    const [modalText, setModalText] = useState('privacy');

    const registerDisabled = () => {
        return !agreed || firstName.length === 0
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                throw new Error('Ошибка регистрации');
            }

            if (result.status === 'login') {
                localStorage.setItem('accessToken', result.accessToken);
                sessionStorage.removeItem('signInEmail');
                localStorage.removeItem('signInStep');
                window.location.href = '/profile';
            }
            else {
                throw new Error(result.error || 'Ошибка на сервере')
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <motion.form
                onSubmit={handleRegister}
                initial={direction === 'forward' ? 'initialForward' : 'initialBackward'}
                animate="animate"
                exit={direction === 'forward' ? 'exitForward' : 'exitBackward'}
                variants={variantsPassword}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    paddingLeft: '4px',
                    paddingRight: '4px'
                }}
            >
                <AuthTitle title="Зарегистрироваться" />

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                    <Typography level="title-md" sx={{ display: 'flex', alignItems: 'center' }}>
                        {email}
                    </Typography>
                    <IconButton
                        variant="plain"
                        size="sm"
                        onClick={handleEditEmail}
                        aria-label="Редактировать почту"
                        sx={{
                            borderRadius: '50px',
                        }}
                    >
                        <Pencil size={20} />
                    </IconButton>
                </Box>

                <FormControl required>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        error={error}
                        autoFocus
                        sx={{
                            borderRadius: '50px',
                            px: 2,
                            py: 1.5,
                            boxShadow: 'none',
                        }}
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            setError('')
                        }}
                    />
                </FormControl>

                <FormControl required error={!!error}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1,
                            py: 1,
                            mx: 'auto',
                            maxWidth: 380,
                        }}
                    >
                        <Checkbox
                            checked={agreed}
                            onChange={(e) => {
                                setAgreed(e.target.checked);
                                setError('');
                            }}
                            sx={{ mt: '2px' }}
                        />
                        <Typography level="body-sm" sx={{ lineHeight: 1.4 }}>
                            Я принимаю{' '}
                            <Link href="/legal">
                                политику конфиденциальности
                            </Link>
                            {' и '}
                            <Link href="/legal">
                                условия использования
                            </Link>
                        </Typography>
                    </Box>
                </FormControl>

                {!!error && <DisplayError error={error} />}

                <Button
                    type="submit"
                    color="success"
                    sx={{ borderRadius: '50px', px: 2, py: 1.5, width: '100%', fontSize: '16px' }}
                    loading={loading}
                    disabled={registerDisabled()}
                >
                    Зарегистрироваться
                </Button>
            </motion.form>

            <ModalPrivacyContent
                open={openModal}
                setOpen={setOpenModal}
                modalText={modalText}
                setModalText={setModalText}
            />
        </>
    );
}

export default StepRegister;
