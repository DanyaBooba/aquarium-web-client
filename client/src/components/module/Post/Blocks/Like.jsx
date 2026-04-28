import { Typography, Box } from '@mui/joy'
import { Heart } from '@phosphor-icons/react'
import { useState } from 'react';
import { useAuth } from '../../../../hooks/auth/useAuth';
import { apiFetch } from '../../../../utils/apiClient';

function Like({ likes = 0, liked = false, idUser = 0, idPost = 0 }) {
    const [likesView, setLikesView] = useState(likes);
    const [like, setLike] = useState(liked);
    const { isAuth } = useAuth();

    const handleLikeClick = async (e) => {
        e.stopPropagation();

        if (!isAuth) window.location.href = '/auth';

        try {
            const url = new URL('/api/post/like', process.env.REACT_APP_API_URL);
            url.searchParams.append('idUser', idUser);
            url.searchParams.append('idPost', idPost);

            const response = await apiFetch(url.toString(), {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }

            const data = await response.json();

            setLikesView(data.countLikes);
            setLike(data.liked);
        } catch (err) {

        }
    };

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleLikeClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLikeClick(e);
                }
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: '100px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'neutral.softHoverBg',
                },
                '&:focus-visible': {
                    outline: '2px solid #8884ff',
                    outlineOffset: '2px',
                },
            }}
        >
            <Heart
                size={20}
                weight={like ? "fill" : "regular"}
                color={like ? "#ff0000" : "currentColor"}
            />
            {!!likesView && likesView > 0 && <Typography level="body-xs">{likesView}</Typography>}
        </Box>
    );
}

export default Like
