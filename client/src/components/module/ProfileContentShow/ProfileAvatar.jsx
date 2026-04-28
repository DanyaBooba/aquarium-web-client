import { Avatar, Typography, Box, Stack } from '@mui/joy';
import VerifiedBadge from '../../ui/VerifiedBadge';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { useTheme } from '@mui/joy/styles';
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import { useCallback } from 'react';
import { useIsOnline } from '../../app/OnlineProvider';

function ShowAvatar({ avatar = null, openImage, isOnline = false }) {
    const theme = useTheme();

    const sxAvatar = {
        width: 124,
        height: 124,
        border: '4px solid',
        borderColor: theme.palette.background.body,
        cursor: avatar ? 'pointer' : 'default',
        pointerEvents: 'all'
    };

    return (
        <Badge
            invisible={!isOnline}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeInset="14%"
            color="success"
            sx={{
                [`& .${badgeClasses.badge}`]: {
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    '&::after': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '3px solid',
                        borderColor: theme.palette.background.body,
                        boxSizing: 'content-box',
                        transform: 'translate(-3px, -3px) !important',
                        content: '""',
                    },
                },
            }}
        >
            <Avatar
                src={avatar?.includes('http') ? avatar : `${process.env.REACT_APP_API_URL}${avatar}` ?? null}
                sx={sxAvatar}
                onClick={() => {
                    if (avatar) openImage(avatar?.includes('http') ? avatar : `${process.env.REACT_APP_API_URL}${avatar}` ?? null);
                }}
            />
        </Badge>
    );
}

function ProfileAvatar({ avatar, cap, firstName, lastName, verified = false, description, userId = null, username = null }) {
    const isOnline = useIsOnline(userId);
    const capUrl = () => {
        if (!cap) return null;
        return cap.startsWith('http') ? cap : `${process.env.REACT_APP_API_URL}${cap}`;
    }

    const openImage = useCallback((src) => {
        Fancybox.show(
            [
                {
                    src,
                    type: "image",
                },
            ],
            {
                animated: false,
                dragToClose: true,
                closeButton: "top",
                Thumbs: false,
                Toolbar: {
                    display: ["close", "zoom"],
                },
                Carousel: {
                    infinite: false,
                },
            }
        );
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            {!!cap && (
                <Box
                    onClick={() => openImage(capUrl())}
                    sx={{
                        height: 220,
                        backgroundImage: `url(${capUrl()})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        borderRadius: '24px',
                        cursor: 'pointer'
                    }}
                />
            )}
            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    mt: !!cap ? '-62px' : 2,
                    pointerEvents: 'none',
                    px: 2
                }}
            >
                <ShowAvatar
                    avatar={avatar ?? null}
                    openImage={openImage}
                    isOnline={isOnline}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', mt: 1, maxWidth: '100%' }}>
                    <Typography
                        level="title-md"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                        }}
                    >
                        {firstName ?? ""} {lastName ?? ""}
                    </Typography>
                    {!!verified && <VerifiedBadge size={18} />}
                </Box>

                {Boolean(username) && (
                    <Typography
                        level="body-sm"
                        textColor="text.tertiary"
                        textAlign="center"
                        sx={{
                            maxWidth: '450px',
                            width: '100%',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            my: '.125rem',
                            mb: '.2rem',
                            fontWeight: 600
                        }}
                    >
                        {`@${username}`}
                    </Typography>
                )}

                {!!description && (
                    <Typography
                        level="body-sm"
                        textColor="text.tertiary"
                        textAlign="center"
                        sx={{
                            maxWidth: '450px',
                            width: '100%',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {description ?? ""}
                    </Typography>
                )}
            </Stack>
        </Box>
    )
}

export default ProfileAvatar
