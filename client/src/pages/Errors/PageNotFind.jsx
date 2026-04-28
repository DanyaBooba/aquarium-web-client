import { AppClear } from '../../components/app/App'
import { Container, Typography, Link } from '@mui/joy'

function PageNotFind() {
    return (
        <AppClear title="Страница не найдена" desc="Запрашиваемая страница не найдена">
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', height: '100dvh' }}>
                <div>
                    <Typography level="h1" sx={{ fontFamily: 'monospace' }}>
                        404
                    </Typography>
                    <Typography level="title-lg" sx={{ mb: '.5rem' }}>
                        Страница не найдена
                    </Typography>
                    <Typography>
                        Возможно вы ошиблись в ссылке
                    </Typography>
                    <Link href="/" overlay />
                </div>
            </Container>
        </AppClear>
    )
}

export default PageNotFind
