import { Link, Box, Badge, Sheet, Typography, IconButton } from '@mui/joy';
import { Bell, DownloadSimpleIcon, XIcon } from '@phosphor-icons/react';
import Logo from '../../module/Logo/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { useCountNotifications } from '../../app/NotificationProvider';
import AquariumLogo from '../../module/Logo/Icon'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth/useAuth';

function isMobileDevice() {
    if (typeof window === 'undefined') return false

    const ua = navigator.userAgent || navigator.vendor
    const isMobileUA = /android|iphone|ipad|ipod/i.test(ua)
    const isSmallScreen = window.innerWidth <= 768

    return isMobileUA || isSmallScreen
}

function ShowApp() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('showApp')

        if (stored === '0') return
        if (!isMobileDevice()) return

        setVisible(true)
    }, [])

    const handleClose = () => {
        localStorage.setItem('showApp', '0')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <Sheet
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                '& svg': {
                    borderRadius: '8px',
                },
            }}
        >
            <AquariumLogo size={48} />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography level="title-md">
                    Аквариум
                </Typography>

                <Link
                    href="#"
                    level="body-xs"
                    endDecorator={<DownloadSimpleIcon size={16} />}
                >
                    Скачать
                </Link>
            </Box>

            <IconButton
                size="sm"
                variant="plain"
                sx={{ ml: 'auto', borderRadius: '50px' }}
                onClick={handleClose}
            >
                <XIcon size={18} />
            </IconButton>
        </Sheet>
    )
}

function ButtonNotification() {
    const countNotifications = useCountNotifications();
    const currentPath = window.location.pathname;

    const href = "/notifications";
    const isActive = currentPath === href;

    return (
        <Badge
            badgeContent={countNotifications}
            color="danger"
            variant="solid"
            size="sm"
        >
            <Link
                component={RouterLink}
                to={href}
                sx={{
                    color: isActive ? 'primary.main' : 'neutral.500',
                    paddingBottom: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                        color: 'primary.dark',
                    },
                }}
                aria-label="Уведомления"
            >
                <Bell size={20} weight={isActive ? 'fill' : 'regular'} />
            </Link>
        </Badge>
    )
}

function ProfileHeader() {
    const { isAuth } = useAuth();

    return (
        <>
            {/* <ShowApp /> */}
            <Box
                sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                className="profile__header"
            >
                <Logo />
                {isAuth && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 2 }}>
                        <ButtonNotification />
                    </Box>
                )}
            </Box>
        </>
    );
}

export default ProfileHeader;
