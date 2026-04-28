import { Box, Typography } from '@mui/joy'
import Logo from '../Logo/Logo'
import { WarningCircle } from '@phosphor-icons/react'

export function Header() {
    return (
        <Box
            component="header"
            sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}
        >
            <Box sx={{ gap: 2, display: 'flex', mx: 'auto', alignItems: 'center' }}>
                <Logo />
            </Box>
        </Box>
    )
}

export function DisplayError({ error, sx = {} }) {
    return (
        <Typography
            color="danger"
            textAlign="center"
            startDecorator={<WarningCircle />}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                mb: '4px',
                justifyContent: 'center',
                ...sx
            }}
        >
            {error}
        </Typography>
    )
}

export function AuthTitle({ title = "Войти в аккаунт", mb = 2 }) {
    return (
        <Typography component="h1" level="h3" textAlign="center" sx={{ mb: mb + "!important" }}>
            {title}
        </Typography>
    )
}
