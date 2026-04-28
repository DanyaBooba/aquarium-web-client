import { motion } from 'framer-motion'
import { Typography, Stack, Box, IconButton, Button } from '@mui/joy'
import { AuthTitle, DisplayError } from './Modules'
import { variantsEmail } from './animate'
import CodeInput from '../CodeInput/CodeInput'
import { Pencil } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { apiFetch } from '../../../utils/apiClient'

function ButtonResendCode({ resendCode, email }) {
    const [timeLeft, setTimeLeft] = useState(59)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsDisabled(false)
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const handleResend = () => {
        resendCode(email)
        setTimeLeft(59)
        setIsDisabled(true)
    }

    return (
        <Button
            onClick={handleResend}
            disabled={isDisabled}
            variant="outlined"
            color="neutral"
            sx={{
                borderRadius: '50px',
                px: 1.5,
                py: 1,
                width: '100%',
                mt: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}
        >
            Отправить код повторно
            {isDisabled && (
                <Typography
                    level="body-sm"
                    sx={{
                        color: 'text.tertiary',
                        fontVariantNumeric: 'tabular-nums'
                    }}
                >
                    {timeLeft}
                </Typography>
            )}
        </Button>
    )
}

function StepVerify({
    direction,
    handleEditEmail,
    setDirection,
    setStep,
    email
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleCodeSubmit = async (code) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/auth/code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка подтверждения кода');
            }

            if (result.status === 'login') {
                localStorage.setItem('accessToken', result.accessToken);
                sessionStorage.removeItem('signInEmail');
                localStorage.removeItem('signInStep');
                window.location.href = '/profile';
            }
            else if (result.status === 'needRegister') {
                setDirection('forward');
                setStep('register');
            }
            else if (result.status === 'needPassword') {
                setDirection('forward');
                setStep('password');
            }
            else {
                throw new Error('Неизвестный статус от сервера');
            }
        } catch (err) {
            setError(err.message || 'Ошибка подтверждения');
            // Сброс кода через 800мс при ошибке
            setResetTrigger(prev => prev + 1);
        } finally {
            setLoading(false);
        }
    }

    const resendCode = async (email) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/auth/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка отправки письма');
            }

            if (result.status !== 'send') {
                throw new Error('Не удалось отправить код');
            }

            // Сброс кода при успешной отправке
            setResetTrigger(prev => prev + 1);
        } catch (err) {
            setError(err.message || 'Ошибка сервера');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.form
            onSubmit={() => { }}
            initial={direction === 'forward' ? 'initialForward' : 'initialBackward'}
            animate="animate"
            exit={direction === 'forward' ? 'exitForward' : 'exitBackward'}
            variants={variantsEmail}
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
            <AuthTitle title="Введите код" />
            <Typography level="body-sm" textAlign="center" sx={{ mb: 2 }}>
                Мы отправили проверочный код на вашу почту.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <Typography
                    level="title-md"
                    sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
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

            {error && <DisplayError error={error} sx={{ mb: '0 !important', mt: '8px' }} />}
            <Stack spacing={2}>
                <CodeInput
                    callback={handleCodeSubmit}
                    setError={setError}
                    loading={loading}
                    error={error}
                    reset={resetTrigger}
                />
            </Stack>
            <ButtonResendCode
                resendCode={resendCode}
                email={email}
            />
        </motion.form>
    )
}

export default StepVerify;
