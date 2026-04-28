import { Sheet, Typography } from "@mui/joy";

export default function WelcomeBlock() {
    return (
        <Sheet variant="plain" sx={{
            borderRadius: '24px',
            p: 2,
            my: 2,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <img
                src="/img/illustrations/delete.png"
                alt="Удалить аккаунт"
                style={{
                    maxWidth: '120px',
                    width: '100%',
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '1rem'
                }}
            />
            <Typography color="danger" level="h4" sx={{ textAlign: 'center', mx: 'auto', mb: '.5rem' }}>
                Удалить аккаунт
            </Typography>
            <Typography level="body-md" sx={{ textAlign: 'center', mx: 'auto', maxWidth: '500px' }}>
                После удаления профиль и все связанные данные будут безвозвратно удалены без возможности восстановления.
            </Typography>
        </Sheet>
    )
}
