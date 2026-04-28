import { Box, Button, FormControl, FormHelperText, Input, Typography } from "@mui/joy";
import { WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { apiFetch } from '../../../utils/apiClient';

function MyInput({ sx, error, ...props }) {
    return (
        <FormControl error={error}>
            <Input
                sx={{
                    px: 2,
                    py: 1.5,
                    boxShadow: 'none',
                    borderRadius: '50px',
                    ...sx
                }}
                slotProps={{ input: { type: 'password' } }}
                {...props}
            />
            {error && (
                <FormHelperText>
                    <WarningCircle size={16} style={{ marginRight: 4 }} />
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    );
}

export default function WritePasswordBlock() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [password, setPassword] = useState(null);

    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedConfirm, setTouchedConfirm] = useState(false);

    const handleBlurPassword = () => setTouchedPassword(true);
    const handleBlurConfirm = () => setTouchedConfirm(true);

    const inputPassword = (e) => {
        setPassword(e?.target?.value ?? null);
    };

    const inputPasswordConfirm = (e) => {
        setPasswordConfirm(e?.target?.value ?? null);
    };

    const validatePassword = (pwd) => {
        if (!pwd) return null;

        if (pwd.length < 4) {
            return "Минимум 4 символов";
        }

        return null;
    };

    const passwordError = validatePassword(password);
    const isPasswordValid = !passwordError && password;

    const samePasswords = () => {
        if (!password || !passwordConfirm) return true;
        return password === passwordConfirm;
    };

    const showButton = () => (
        isPasswordValid && passwordConfirm && samePasswords()
    );

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/api/profile/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                })
            });

            const data = await response.json();

            if (data.status) {
                alert('Пароль успешно обновлен');
            }

            if (!response.ok) {
                throw new Error('Ошибка обновления пароля');
            }
        } catch (err) {
            setError('Произошла ошибка при обновлении пароля');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && <Typography color="danger" mb={2}>{error}</Typography>}
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexDirection: 'column' }}>
                <Typography level="body-xs" sx={{ textTransform: 'uppercase', pl: 2.15 }}>
                    Ввести пароль
                </Typography>
                <MyInput
                    placeholder="Пароль"
                    value={password}
                    onChange={inputPassword}
                    onBlur={handleBlurPassword}
                    error={touchedPassword && passwordError}
                />
                <MyInput
                    placeholder="Подтвердите пароль"
                    value={passwordConfirm}
                    onChange={inputPasswordConfirm}
                    onBlur={handleBlurConfirm}
                />
                {touchedConfirm && !samePasswords() && (
                    <Typography
                        color="danger"
                        level="title-lg"
                        variant="soft"
                        startDecorator={<WarningCircle size={16} weight="bold" />}
                        sx={{
                            mt: 1,
                            borderRadius: '50px',
                            px: 2,
                            py: 1.4,
                            marginInline: '0',
                            fontSize: '16px',
                            justifyContent: 'center'
                        }}
                    >
                        Пароли не совпадают
                    </Typography>
                )}
                {showButton() && (
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: '50px',
                            mt: 1,
                            py: 1.2,
                            width: '100%',
                            fontSize: '16px'
                        }}
                        loading={loading}
                    >
                        Обновить пароль
                    </Button>
                )}
            </Box>
        </>
    );
}
