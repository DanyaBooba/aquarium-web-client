import { AppClear } from '../../components/app/App'
import { Box } from '@mui/joy'
import { Header } from '../../components/module/Auth/Modules'
import TemplateAuth from '../../components/module/Auth/TemplateAuth'

function PageSignIn() {
    const sxRoot = {
        transition: 'width var(--Transition-duration)',
        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(12px)',
    }

    const sxChild = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        width: '100%',
        px: 2,
    }

    const sxMain = {
        my: 'auto',
        py: 2,
        pb: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        justifyContent: 'center',
        '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        },
        [`& .MuiFormLabel-asterisk`]: {
            visibility: 'hidden',
        },
    }

    return (
        <AppClear title="Авторизация в аккаунт" desc="Войти в аккаунт на сайте Аквариум">
            <Box sx={sxRoot}>
                <Box sx={sxChild}>
                    <Box component="main" sx={sxMain}>
                        <Header />
                        <TemplateAuth />
                    </Box>
                </Box>
            </Box>
        </AppClear>
    )
}

export default PageSignIn
