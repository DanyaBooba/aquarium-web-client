import { AppProfile } from '../../components/app/App'
import { Box, CircularProgress } from '@mui/joy'

import ProfileContentShow from '../../components/module/ProfileContentShow/ProfileContentShow';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/user/useUser';
import { usePosts } from '../../hooks/post/usePosts';
import { useScrollRestoration } from '../../hooks/service/useScrollRestoration';
import ServerError from '../../components/module/ServerError/ServerError';

function PageShowUser({ format = "id", side = false }) {
    format = ['id', 'username'].includes(format) ? format : 'id';
    const { username, id } = useParams();

    const { user, loading: userLoading, error: userError } = useUser({ format, username, id });
    const { posts, loading: postsLoading, error: postsError } = usePosts({
        idUser: id,
        side
    });

    const loading = userLoading || postsLoading;
    const error = userError || postsError;

    useScrollRestoration('page-profile', [loading]);

    return (
        <AppProfile>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError title={error} desc="" />
            ) : user ? (
                <ProfileContentShow user={user} posts={posts} side={side} />
            ) : null}
        </AppProfile>
    )
}

export default PageShowUser
