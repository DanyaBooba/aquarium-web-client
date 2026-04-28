import { useState } from 'react'
import { Stack, Card, CardContent } from '@mui/joy'
import { useAuth } from '../../../hooks/auth/useAuth';
import { useTheme } from '@mui/joy/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Like from './Blocks/Like'
import ShareBlock from './Blocks/ShareBlock'
import View from './Blocks/View'
import CommentBlock from './Blocks/CommentBlock'
import MoreMenu from './Blocks/MoreMenu'
import Content from './Blocks/Content'
import Status from './Blocks/Status'
import Author from './Blocks/Author'
import Attachments from './Blocks/Attachments';

function Post({ post }) {
    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState(false);
    const { isAuth } = useAuth();
    const theme = useTheme();

    const handlePostClick = () => {
        setIsFocused(true);
        navigate(`/post/${post.idUser}/${post.idPost}`);
    };

    const isModerating = parseInt(post.status) === -1;

    const borderColorStatus = () => {
        const status = parseInt(post.status);

        switch (status) {
            case 0: return theme.colors.post.status.draft;
            case -1: return 'transparent';
            case -2: return theme.colors.post.status.rejected;
            default: return 'transparent';
        }
    };

    const borderColor = borderColorStatus();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePostClick();
        }
    };

    return (
        <motion.div
            tabIndex={0}
            role="link"
            layoutId={`post-${post.id}`}
            onClick={handlePostClick}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
                cursor: 'pointer',
                width: '100%',
                display: 'block',
                outline: 'none',
                borderRadius: '26px',
                border: '2px solid',
                borderColor,
                position: 'relative',
                transition: 'border-color 0.1s ease-in-out',

                ...(isModerating && {
                    borderColor: 'transparent',
                    backgroundImage: `
                        ${theme.colors.post.status.moderation.start},
                        ${theme.colors.post.status.moderation.finish}
                    `,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    backgroundSize: '400% 400%',
                    animation: 'gradientBorderMove 3s ease infinite',
                }),
            }}
        >
            <Card variant="plain" sx={{ borderRadius: '24px', position: 'relative' }}>
                {/* More Menu */}
                {isAuth && <MoreMenu globalId={post?.id ?? 0} myPost={post?.myPost ?? false} />}

                <CardContent>
                    {/* Author */}
                    <Author
                        avatar={post?.user?.avatar}
                        firstName={post?.user?.firstName}
                        lastName={post?.user?.lastName}
                        username={post?.user?.username}
                        idUser={post?.user?.id}
                        verified={!!post?.user?.verified}
                        date={post?.created_at}
                        maxWidth="90"
                    />

                    {/* Status */}
                    <Status status={post?.status} />

                    {/* Content */}
                    <Content
                        content={post.content ?? null}
                        style={{ pointerEvents: 'none !important', cursor: 'default !important' }}
                        removeLinks={true}
                    />

                    {/* Attachments */}
                    <Attachments attachments={post?.attachments} postId={post?.id} />

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* Like */}
                            <Like
                                likes={post?.countLikes ?? 0}
                                liked={post?.like ?? false}
                                idUser={post?.idUser ?? 0}
                                idPost={post?.idPost ?? 0}
                            />
                            {/* Comment */}
                            <CommentBlock
                                postLink={`/post/${post?.idUser}/${post?.idPost}`}
                                comments={post?.countComments ?? 0}
                            />

                            {/* Share */}
                            <ShareBlock
                                idPost={post?.idPost}
                                idUser={post?.idUser}
                            />
                        </Stack>

                        {/* View */}
                        <View views={post?.countViews} />
                    </Stack>
                </CardContent>
            </Card>

            <style>
                {`
                @keyframes gradientBorderMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
        </motion.div>
    );
}


export default Post
