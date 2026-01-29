import { useProfile } from '../../hooks/profile/useProfile'
import { AppProfile } from '../../components/app/App'
import { Box, CircularProgress } from '@mui/joy'

import ProfileContentShow from '../../components/module/ProfileContentShow/ProfileContentShow';
import ServerError from '../../components/module/ServerError/ServerError';

function PageProfile({ me = false }) {
    const { user, loading, error } = useProfile();

    return (
        <AppProfile title="Ваш профиль" desc="Посмотрите ваш профиль в социальной сети Аквариум мини">
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : user ? (
                <ProfileContentShow user={user} me={me} />
            ) : null}
        </AppProfile>
    )
}

export default PageProfile
