import { motion } from 'framer-motion'
import { Input, FormControl, Button } from '@mui/joy'
import { AuthTitle, DisplayError } from './Modules'
import { variantsEmail } from './animate'
import { useState } from 'react';

function StepEmail({
    direction,
    emailInput,
    handleEmailInputChange,
    setDirection,
    setStep,
    setEmail
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
            const response = await fetch('https://mini.aquarium.org.ru/api/auth/email', {
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
            style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', top: 0, left: 0, paddingLeft: '4px', paddingRight: '4px' }}
        >
            <AuthTitle title="Войти в аккаунт" />
            <FormControl required>
                <Input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    autoFocus
                    sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 1.5,
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
                    py: 1.5,
                    width: '100%',
                    fontSize: '16px'
                }}
                loading={loading}
            >
                Далее
            </Button>
        </motion.form>
    )
}

export default StepEmail;
