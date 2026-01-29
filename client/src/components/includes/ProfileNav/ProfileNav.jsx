import { Box, IconButton } from '@mui/joy';
import { House, PencilLine, User, ChatCircle, SignIn, MagnifyingGlass } from '@phosphor-icons/react';

import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useAuth';

function NavButton({ path, icon: Icon, currentPath, handleNavigate }) {
    const isActive = currentPath.startsWith(path);

    const color = (theme) => {
        const primary = theme.vars.palette.primary

        switch (theme.palette.mode) {
            case 'dark':
                return isActive ? primary[200] : primary[300]
            default:
                return isActive ? primary[500] : primary[800]
        }
    }

    const backgroundColor = (theme) => {
        switch (theme.palette.mode) {
            case 'dark':
                return isActive ? theme.vars.palette.primary[800] : 'transparent'
            default:
                return isActive ? theme.vars.palette.primary[100] : 'transparent'
        }
    }

    return (
        <motion.div
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'contents' }}
        >
            <IconButton
                variant="plain"
                sx={(theme) => ({
                    color: color(theme),
                    backgroundColor: backgroundColor(theme),
                    borderRadius: '50px',
                    width: 40,
                    height: 40,
                    flex: 1,
                })}
                onClick={() => handleNavigate(path)}
            >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
            </IconButton>
        </motion.div>
    );
}

function ProfileNav() {
    const currentPath = new URL(window.location.href).pathname;
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth } = useAuth();

    const handleNavigate = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate(path);
        }
    };

    const menuProfile = [
        { path: '/feed', icon: House },
        { path: '/search', icon: MagnifyingGlass },
        { path: '/post/create', icon: PencilLine },
        { path: '/messages', icon: ChatCircle },
        { path: '/profile', icon: User },
    ];

    const menuGuest = [
        { path: '/feed', icon: House },
        { path: '/search', icon: MagnifyingGlass },
        // { path: '/auth', icon: SignIn },
    ];

    const menu = isAuth ? menuProfile : menuGuest;

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
                        backdropFilter: 'blur(12px)',
                        backgroundColor: `${theme.palette.background.body}99`,
                        border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
                        borderRadius: '100px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                        padding: '10px 20px',
                        width: '100%',
                        maxWidth: menu.length * 70,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backdropSaturation: '180%',
                        p: .6,
                        gap: .8,
                        pointerEvents: 'auto',
                    })}
                >
                    {menu.map(({ path, icon }, index) => (
                        <NavButton
                            key={index}
                            path={path}
                            icon={icon}
                            currentPath={currentPath}
                            handleNavigate={handleNavigate}
                        />
                    ))}
                </Box>
                {!isAuth && (
                    <Box
                        sx={(theme) => ({
                            backdropFilter: 'blur(12px)',
                            backgroundColor: `${theme.palette.background.body}99`,
                            border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
                            borderRadius: '100px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                            padding: '10px 20px',
                            width: '100%',
                            maxWidth: 70,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backdropSaturation: '180%',
                            p: .6,
                            gap: .8,
                            pointerEvents: 'auto',
                        })}
                    >
                        <NavButton
                            path="/auth"
                            icon={SignIn}
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
