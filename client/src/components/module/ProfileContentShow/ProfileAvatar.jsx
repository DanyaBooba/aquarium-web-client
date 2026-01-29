import { Avatar, Typography, Box, Stack } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import { useCallback } from 'react';

function ShowAvatar({ avatar = null, openImage }) {
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
        <Avatar
            src={`https://mini.aquarium.org.ru/${avatar}` ?? null}
            sx={sxAvatar}
            onClick={() => {
                if (avatar) openImage(`https://mini.aquarium.org.ru/${avatar}`);
            }}
        />
    );
}

function ProfileAvatar({ avatar, cap, firstName, lastName, description }) {
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
        <Box>
            {!!cap && (
                <Box
                    onClick={() => openImage(`https://mini.aquarium.org.ru/${cap}`)}
                    sx={{
                        height: 220,
                        backgroundImage: `url(${`https://mini.aquarium.org.ru/${cap}` ?? null})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}
                />
            )}
            <Stack direction="column" alignItems="center" sx={{ mt: !!cap ? '-62px' : 2, pointerEvents: 'none' }}>
                <ShowAvatar
                    avatar={avatar ?? null}
                    openImage={openImage}
                />
                <Typography
                    level="title-md"
                    sx={{
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 600
                    }}
                >
                    {firstName ?? ""}
                    {' '}
                    {lastName ?? ""}
                </Typography>
                {!!description && (
                    <Typography level="body-sm" textColor="text.tertiary" textAlign="center" sx={{ maxWidth: '450px' }}>
                        {description ?? ""}
                    </Typography>
                )}
            </Stack>
        </Box>
    )
}

export default ProfileAvatar
