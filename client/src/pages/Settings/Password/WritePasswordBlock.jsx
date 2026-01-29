import { Box, Button, FormControl, FormHelperText, Input, Typography } from "@mui/joy";
import { WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";

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
                    <WarningCircle size={16} style={{ mr: 0.5 }} />
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

    const [touchedConfirm, setTouchedConfirm] = useState(false);

    const handleBlurConfirm = () => setTouchedConfirm(true);

    const inputPassword = (e) => (
        setPassword(e?.target?.value ?? null)
    )

    const inputPasswordConfirm = (e) => (
        setPasswordConfirm(e?.target?.value ?? null)
    )

    const samePasswords = () => {
        if (!password || !passwordConfirm) return true;

        if (password != passwordConfirm) return false;

        return true;
    }

    const showButton = () => (
        samePasswords() && password && passwordConfirm
    )

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
                        type="submit"
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
    )
}
