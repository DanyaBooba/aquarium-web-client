import { Stack, IconButton, Box } from '@mui/joy';
import { X } from '@phosphor-icons/react';

import Content from '../Post/Blocks/Content'
import Like from '../Post/Blocks/Like'
import ShareBlock from '../Post/Blocks/ShareBlock'
import View from '../Post/Blocks/View'
import Status from '../Post/Blocks/Status';
import Author from '../Post/Blocks/Author';
import Attachments from '../Post/Blocks/Attachments';
import MoreMenu from '../Post/Blocks/MoreMenu';
import { useAuth } from '../../../hooks/auth/useAuth';

const commonButtonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '6px',
    cursor: 'pointer',
    color: 'neutral.600',
    '&:hover': {
        backgroundColor: 'neutral.softHoverBg',
    },
    '&:focus-visible': {
        outline: '2px solid #8884ff',
        outlineOffset: '2px',
    },
    width: 36,
    height: 36,
};

function TemplatePost({ post, user, handleClose = null, menu = true }) {
    const { isAuth } = useAuth();

    return (
        <Box
            mt={2}
            sx={{
                width: '100%',
                display: 'block',
            }}
        >
            {/* Author */}
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 1 }}>
                <Author
                    avatar={user?.avatar}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    verified={user?.verified}
                    username={user?.username}
                    idUser={user?.id}
                    date={post?.created_at}
                />

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {(isAuth && menu) && (
                        <MoreMenu
                            globalId={post?.id ?? 0}
                            myPost={post?.myPost ?? false}
                            posAbsolute={false}
                        />
                    )}
                    {!!handleClose && (
                        <IconButton
                            size="sm"
                            variant="plain"
                            sx={commonButtonSx}
                            onClick={handleClose}
                            aria-label="Закрыть"
                        >
                            <X size={20} />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Status */}
            <Status status={post?.status} />

            {/* Content */}
            <Content content={post.content} showFull={true} />

            {/* Attachments */}
            <Attachments attachments={post?.attachments ?? []} postId={post?.id} />

            {/* Actions */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Like
                        likes={post?.countLikes ?? 0}
                        liked={post?.like ?? false}
                        idUser={post?.idUser ?? 0}
                        idPost={post?.idPost ?? 0}
                    />
                    <ShareBlock
                        idPost={post?.idPost}
                        idUser={post?.idUser}
                    />
                </Stack>

                <View post={post} />
            </Stack>
        </Box>
    )
}

export default TemplatePost;
