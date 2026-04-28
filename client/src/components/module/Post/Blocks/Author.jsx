import { Avatar, Typography, Box } from '@mui/joy'
import FormatDateDistanceToNow from '../../FormatDateDistanceToNow/FormatDateDistanceToNow'
import { useNavigate } from 'react-router-dom';
import VerifiedBadge from '../../../ui/VerifiedBadge';

function Author({
    avatar,
    firstName,
    lastName,
    verified = false,
    username = null,
    idUser = 0,
    date = null,
    maxWidth = "80"
}) {
    const navigate = useNavigate();

    const handleAuthorClick = (e) => {
        e.stopPropagation();
        navigate(`/show/id/${idUser}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAuthorClick(e);
        }
    };

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleAuthorClick}
            onKeyDown={handleKeyDown}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '999px',
                px: 1,
                pr: 2,
                py: 0.5,
                '&:hover': {
                    backgroundColor: 'neutral.softHoverBg',
                },
                '&:focus-visible': {
                    outline: '2px solid #8884ff',
                    outlineOffset: '2px',
                },
                cursor: 'pointer',
                width: 'fit-content',
                maxWidth: `${maxWidth}%`,
            }}
        >
            <Avatar src={avatar?.includes('http') ? avatar : `${process.env.REACT_APP_API_URL}${avatar}` ?? null} />
            <Box sx={{ ml: 1, minWidth: 0, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                    <Typography
                        level="body-md"
                        noWrap
                        sx={{ minWidth: 0, fontWeight: 600 }}
                    >
                        {firstName ?? null}{' '}{lastName ?? null}
                    </Typography>
                    {Boolean(verified) && <VerifiedBadge size={15} />}
                </Box>
                <Typography
                    level="body-xs"
                    textColor="text.tertiary"
                    noWrap
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}
                >
                    <FormatDateDistanceToNow dateString={date ?? null} />
                </Typography>
            </Box>
        </Box>
    );
}

export default Author;
