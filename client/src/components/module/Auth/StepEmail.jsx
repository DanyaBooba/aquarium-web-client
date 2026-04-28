import { motion } from 'framer-motion'
import { Input, FormControl, Button, Divider, Box, Typography, Link } from '@mui/joy'
import { AuthTitle, DisplayError } from './Modules'
import { variantsEmail } from './animate'
import { useState } from 'react';
import YandexLogo from '../YandexLogo/YandexLogo';
import { apiFetch } from '../../../utils/apiClient';

function StepEmail({
    direction,
    emailInput,
    handleEmailInputChange,
    setDirection,
    setStep,
    setEmail,
    handlerYandexLogin
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const formEmail = emailInput.trim();

        if (!formEmail) {
            setError('Необходимо ввести почту');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/auth/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formEmail
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                throw new Error('Ошибка сервера');
            }

            if (result.status === 'send') {
                setEmail(formEmail);
                setDirection('forward');
                setStep('code');
            } else {
                throw new Error('Не удалось отправить код');
            }
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.form
            onSubmit={handleEmailSubmit}
            initial="initial"
            animate="animate"
            exit={direction === 'forward' ? "exitForward" : "exitBackward"}
            variants={variantsEmail}
            style={{ position: 'relative', width: '100%', height: '100%', justifyContent: 'center', top: 0, left: 0, paddingLeft: '4px', paddingRight: '4px' }}
        >
            <AuthTitle title="Введите почту" />
            <FormControl required>
                <Input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    autoComplete="email"
                    autoFocus
                    sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 1.5,
                        mb: 1,
                        boxShadow: 'none',
                    }}
                    value={emailInput}
                    onChange={(e) => {
                        setError(null)
                        handleEmailInputChange(e)
                    }}
                />
            </FormControl>
            {!!error && <DisplayError error={error} />}
            <Button
                type="submit"
                sx={{
                    borderRadius: '50px',
                    px: 2,
                    py: 1.75,
                    width: '100%',
                    fontSize: '16px'
                }}
                loading={loading}
            >
                Далее
            </Button>
            <Divider sx={{ my: 2 }}>или</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                <Button
                    onClick={handlerYandexLogin}
                    variant="soft"
                    sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 1.25,
                        width: '100%',
                        gap: '.5rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <YandexLogo size={32} />
                    Войти с Яндекс ID
                </Button>
            </Box>

            <Typography
                level="body-xs"
                sx={{
                    textAlign: 'center',
                }}
            >
                Продолжая вы соглашаетесь<br />с{' '}
                <Link href="/legal">
                    политикой конфиденциальности
                </Link>
            </Typography>
        </motion.form >
    )
}

export default StepEmail;
