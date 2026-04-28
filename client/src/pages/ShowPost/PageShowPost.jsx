import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { usePost } from '../../hooks/post/usePost'
import { motion } from 'framer-motion';

import { AppProfile } from '../../components/app/App'
import { Box, CircularProgress } from '@mui/joy';

import TemplatePost from '../../components/module/TemplatePost/TemplatePost';
import TemplateComments from '../../components/module/TemplateComments/TemplateComments';
import ServerError from '../../components/module/ServerError/ServerError';

function PageShowPost() {
    const { idUser, idPost } = useParams();
    const { post, user, error, loading } = usePost(idUser ?? 0, idPost ?? 0);
    const navigate = useNavigate();

    const [isClosing, setIsClosing] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let timer;

        if (loading) {
            timer = setTimeout(() => {
                setShowLoading(true);
            }, 1000);
        } else {
            setShowLoading(false);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            navigate(-1);
        }, 150);
    };

    const handleAnimationComplete = () => {
        if (isClosing) {
            navigate(-1);
        }
    };

    const showContent = (content, len) => {
        const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
        const words = plainText.split(/\s+/);
        let result = '';

        for (const word of words) {
            if ((result + word).length > len) break;
            result += (result ? ' ' : '') + word;
        }

        return result;
    };

    const title = !loading && showContent(post?.content ?? '', 56);
    const description = `${(!loading && showContent(post?.content ?? '', 145))} — читайте в Аквариум`

    return (
        <AppProfile title={title} desc={description}>
            {showLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : post && user ? (
                <motion.div
                    layoutId={`post-${post.id}`}
                    initial={{ scale: 0.98, opacity: 0.8, filter: 'blur(3px)' }}
                    animate={isClosing ? { scale: 0.98, opacity: 0, filter: 'blur(3px)' } : { scale: 1, opacity: 1, filter: 'blur(0)' }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    onAnimationComplete={handleAnimationComplete}
                    style={{ position: 'relative' }}
                >
                    <TemplatePost post={post} user={user} handleClose={handleClose} />
                    <TemplateComments globalPostId={post?.id ?? 0} />
                </motion.div>
            ) : null}
        </AppProfile>
    );
}

export default PageShowPost
