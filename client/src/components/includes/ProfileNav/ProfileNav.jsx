import { Box, IconButton } from '@mui/joy';
import { House, User, ChatCircle, SignIn, MagnifyingGlass, PencilLine } from '@phosphor-icons/react';

import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useUnreadMessages } from '../../app/UnreadMessagesProvider';

function LoginButton({ path, icon: Icon, currentPath, handleNavigate, text = '' }) {
    const isActive = currentPath.startsWith(path);

    const activeColor = (theme) => {
        const primary = theme.vars.palette.primary;
        return theme.palette.mode === 'dark' ? primary[200] : primary[500];
    };

    const inactiveColor = (theme) => {
        const primary = theme.vars.palette.primary;
        return theme.palette.mode === 'dark' ? primary[300] : primary[800];
    };

    return (
        <IconButton
            variant="plain"
            sx={(theme) => ({
                position: 'relative',
                color: isActive ? activeColor(theme) : inactiveColor(theme),
                borderRadius: '50px',
                width: 55,
                height: 55,
                flex: 1,
                '&:hover': { bgcolor: 'transparent' },
                gap: '.25rem'
            })}
            onClick={() => handleNavigate(path)}
        >
            {isActive && (
                <Box
                    component={motion.div}
                    layoutId="nav-bg"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    sx={(theme) => ({
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50px',
                        zIndex: -1,
                        backgroundColor: theme.palette.mode === 'dark'
                            ? theme.vars.palette.primary[800]
                            : theme.vars.palette.primary[100],
                    })}
                />
            )}
            {text}
            <Icon
                size={20}
                weight={isActive ? 'fill' : 'regular'}
                style={{ zIndex: 1 }}
            />
        </IconButton>
    );
}

function NavButton({ path, icon: Icon, currentPath, handleNavigate, text = '', size = 20, showDot = false }) {
    const isActive = currentPath.startsWith(path);

    const activeColor = (theme) => {
        const primary = theme.vars.palette.primary;
        return theme.palette.mode === 'dark' ? primary[200] : primary[500];
    };

    const inactiveColor = (theme) => {
        const primary = theme.vars.palette.primary;
        return theme.palette.mode === 'dark' ? primary[300] : primary[800];
    };

    return (
        <IconButton
            variant="plain"
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                fontSize: '10px',
                position: 'relative',
                color: isActive ? activeColor(theme) : inactiveColor(theme),
                borderRadius: '50px',
                width: 50,
                height: 45,
                flex: 1,
                '&:hover': { bgcolor: 'transparent' },
                gap: '2px'
            })}
            onClick={() => handleNavigate(path)}
        >
            {isActive && (
                <Box
                    component={motion.div}
                    layoutId="nav-bg"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    sx={(theme) => ({
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50px',
                        zIndex: -1,
                        backgroundColor: theme.palette.mode === 'dark'
                            ? theme.vars.palette.primary[800]
                            : theme.vars.palette.primary[100],
                    })}
                />
            )}
            {!!Icon && (
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <Icon
                        size={size}
                        weight={isActive ? 'fill' : 'regular'}
                        style={{ zIndex: 1 }}
                    />
                    {showDot && (
                        <Box sx={{
                            position: 'absolute',
                            top: -2,
                            right: -4,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: 'danger.500',
                            zIndex: 2,
                        }} />
                    )}
                </Box>
            )}
            {!!text && (
                <>
                    {text}
                </>
            )}
        </IconButton>
    );
}

function ProfileNav() {
    const currentPath = new URL(window.location.href).pathname;
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth } = useAuth();
    const unreadCount = useUnreadMessages();

    const handleNavigate = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate(path);
        }
    };

    const menuProfile = [
        { path: '/feed', icon: House, label: 'Главная' },
        // { path: '/search', icon: MagnifyingGlass },
        { path: '/post/create', icon: PencilLine, label: 'Запись' },
        { path: '/messages', icon: ChatCircle, label: 'Сообщения' },
        { path: '/profile', icon: User, label: 'Профиль' },
    ];

    const menuGuest = [
        { path: '/feed', icon: House, label: 'Главная' },
        { path: '/search', icon: MagnifyingGlass, label: 'Поиск' },
        // { path: '/auth', icon: SignIn },
    ];

    const menu = isAuth ? menuProfile : menuGuest;

    const styleElement = (theme) => ({
        backdropFilter: 'blur(12px)',
        backgroundColor: `${theme.palette.background.body}99`,
        border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
        borderRadius: '100px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        padding: '10px 20px',
        width: '100%',
        // maxWidth: menu.length * 80,
        height: 55,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropSaturation: '180%',
        p: .6,
        gap: .8,
        pointerEvents: 'auto',
    });

    return (
        <Box sx={{ pb: 'env(safe-area-inset-bottom)' }} className="app__bottom-nav">
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    px: 2,
                    py: 1.2,
                    gap: 1,
                    zIndex: 1300,
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}
            >
                <Box
                    sx={(theme) => ({
                        ...styleElement(theme),
                        maxWidth: menu.length * 80,
                    })}
                >
                    {menu.map(({ path, icon, label }, index) => (
                        <NavButton
                            key={index}
                            path={path}
                            icon={icon}
                            text={label}
                            currentPath={currentPath}
                            handleNavigate={handleNavigate}
                            showDot={path === '/messages' && unreadCount > 0 && !currentPath.startsWith('/messages') && !currentPath.startsWith('/chat')}
                        />
                    ))}
                </Box>
                {isAuth && (
                    <Box
                        sx={(theme) => ({
                            ...styleElement(theme),
                            maxWidth: 55,
                        })}
                    >
                        <NavButton
                            path="/search"
                            icon={MagnifyingGlass}
                            currentPath={currentPath}
                            handleNavigate={handleNavigate}
                        />
                    </Box>
                )}
                {!isAuth && (
                    <Box
                        sx={(theme) => ({
                            ...styleElement(theme),
                            maxWidth: 120,
                        })}
                    >
                        <LoginButton
                            path="/auth"
                            icon={SignIn}
                            text="Войти"
                            currentPath={currentPath}
                            handleNavigate={handleNavigate}
                        />
                    </Box>
                )}
            </Box>
        </Box >
    );
}

export default ProfileNav;
