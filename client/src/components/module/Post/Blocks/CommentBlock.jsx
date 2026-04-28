import { Typography, Box } from '@mui/joy'
import { ChatIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom';

function CommentBlock({ postLink, comments }) {
    const navigate = useNavigate();

    const handleCommentClick = (e) => {
        e.stopPropagation();
        navigate(`${postLink}/#comments`);
    };

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleCommentClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCommentClick(e);
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
            <ChatIcon size={20} />
            {!!comments && comments > 0 && <Typography level="body-xs">{comments}</Typography>}
        </Box>
    );
}

export default CommentBlock
