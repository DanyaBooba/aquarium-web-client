import { motion } from 'framer-motion'
import { Input, FormControl, Button, Stack, Box, Typography, IconButton } from '@mui/joy'
import { AuthTitle, DisplayError } from './Modules'
import { variantsPassword } from './animate'
import { Pencil } from '@phosphor-icons/react'
import { useState } from 'react'
import { apiFetch } from '../../../utils/apiClient'

function StepPassword({ direction, email, handleEditEmail }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/auth/password', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка авторизации');
            }

            if (result.status === 'login') {
                localStorage.setItem('accessToken', result.accessToken);
                sessionStorage.removeItem('signInEmail');
                localStorage.removeItem('signInStep');
                window.location.href = '/profile';
            }
            else {
                throw new Error(result.error || 'Ошибка от сервера');
            }
        } catch (err) {
            setError(err.message || 'Ошибка авторизации');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.form
            onSubmit={handlePasswordSubmit}
            initial={direction === 'forward' ? 'initialForward' : 'initialBackward'}
            animate="animate"
            exit={direction === 'forward' ? 'exitForward' : 'exitBackward'}
            variants={variantsPassword}
            style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', top: 0, left: 0, paddingLeft: '4px', paddingRight: '4px' }}
        >
            <AuthTitle title="Введите пароль" />
            <Stack sx={{ gap: 2 }}>
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
                            borderRadius: '50px'
                        }}
                    >
                        <Pencil size={20} />
                    </IconButton>
                </Box>
                <FormControl required>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        autoFocus
                        value={password}
                        error={error}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                        sx={{
                            borderRadius: '50px',
                            px: 2,
                            py: 1.5,
                            boxShadow: 'none',
                        }}
                    />
                </FormControl>
                {error && <DisplayError error={error} />}
                <Button
                    type="submit"
                    sx={{ borderRadius: '50px', px: 2, py: 1.5, width: '100%', fontSize: '16px' }}
                    loading={loading}
                >
                    Войти
                </Button>
            </Stack>
        </motion.form>
    )
}

export default StepPassword;
