import { Sheet, Typography } from "@mui/joy";

export default function WelcomeBlock() {
    return (
        <Sheet variant="plain" sx={{
            borderRadius: '12px',
            p: 2,
            my: 2,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <img
                src="/img/illustrations/security.png"
                alt="Установить пароль на аккаунт"
                style={{
                    maxWidth: '125px',
                    width: '100%',
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '1rem'
                }}
            />
            <Typography level="h4" sx={{ textAlign: 'center', mx: 'auto', mb: '.5rem' }}>
                Установить пароль
            </Typography>
            <Typography level="body-md" sx={{ textAlign: 'center', mx: 'auto', maxWidth: '500px' }}>
                Добавьте пароль, чтобы защитить аккаунт. После установки вход будет возможен только с использованием пароля.
            </Typography>
        </Sheet>
    )
}
