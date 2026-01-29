import { useParams } from 'react-router-dom'
import { usePost } from '../../hooks/post/usePost'

import { Typography, Box, CircularProgress } from '@mui/joy';

import TemplatePost from '../../components/module/TemplatePost/TemplatePost';
import TemplateComments from '../../components/module/TemplateComments/TemplateComments';
import ServerError from '../../components/module/ServerError/ServerError';

function PageShowPostEmbed() {
    const { idUser, idPost } = useParams();
    const { post, user, error, loading } = usePost(idUser, idPost);

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : post && user ? (
                <>
                    <TemplatePost post={post} user={user} menu={false} />
                    <TemplateComments />
                </>
            ) : null}
        </>
    );
}

export default PageShowPostEmbed
