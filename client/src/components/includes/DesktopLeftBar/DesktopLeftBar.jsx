import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, List, ListItem, ListItemButton, ListItemDecorator, Badge, Box } from '@mui/joy';
import { House, PencilLine, User, Bell, MagnifyingGlass, GearSix, ChatCircle } from '@phosphor-icons/react';
import Logo from '../../module/Logo/Logo';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useCountNotifications } from '../../app/NotificationProvider';
import { useUnreadMessages } from '../../app/UnreadMessagesProvider';

function ButtonBar({ label, path, Icon, notification = false, isActive, unreadMessages = false }) {
    const countNotifications = useCountNotifications();
    const unreadCount = useUnreadMessages();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        if (location.pathname === path) {
            const scrollEl = document.querySelector('.profile');
            if (scrollEl) {
                scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate(path);
        }
    }

    return (
        <ListItem key={label}>
            <ListItemButton
                onClick={() => handleNavigate(path)}
                color="primary"
                sx={(theme) => ({
                    borderRadius: '50px',
                    px: 2,
                    fontWeight: isActive ? '600' : 'normal',
                    fontSize: '16px',
                    transition: '.3s',
                    color: isActive
                        ? theme.palette.mode === 'dark'
                            ? theme.vars.palette.primary[100]
                            : theme.vars.palette.primary[600]
                        : theme.vars.palette.text.primary,
                    backgroundColor: isActive
                        ? theme.palette.mode === 'dark'
                            ? theme.vars.palette.primary[800]
                            : theme.vars.palette.primary[100]
                        : 'transparent',
                    '&:hover': {
                        backgroundColor: isActive
                            ? undefined
                            : theme.palette.mode === 'dark'
                                ? theme.vars.palette.primary[900]
                                : theme.vars.palette.primary[200],
                    },

                    '.list-hover &:not(:hover)': {
                        opacity: .6,
                    },
                })}
            >
                <ListItemDecorator
                    sx={{
                        color: 'currentColor',
                    }}
                >
                    {notification && countNotifications > 0 ? (
                        <Badge
                            badgeContent={countNotifications}
                            color="danger"
                            variant="solid"
                            size="sm"
                        >
                            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                        </Badge>
                    ) : unreadMessages && unreadCount > 0 && !location.pathname.startsWith('/messages') && !location.pathname.startsWith('/chat') ? (
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                            <Box sx={{
                                position: 'absolute',
                                top: -2,
                                right: -4,
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'danger.500',
                            }} />
                        </Box>
                    ) : (
                        <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                    )}
                </ListItemDecorator>
                {label}
            </ListItemButton>
        </ListItem>
    );
}

function DesktopLeftBar() {
    const [hover, setHover] = useState(false);
    const location = useLocation();
    const { isAuth } = useAuth();

    const menuItems = [
        { Icon: House, label: 'Главная', path: '/feed' },
        { Icon: User, label: 'Профиль', path: '/profile' },
        { Icon: ChatCircle, label: 'Сообщения', path: '/messages', unreadMessages: true },
        { Icon: PencilLine, label: 'Создать запись', path: '/post/create' },
        { Icon: MagnifyingGlass, label: 'Поиск', path: '/search' },
        { Icon: Bell, label: 'Уведомления', path: '/notifications', notification: true },
        { Icon: GearSix, label: 'Настройки', path: '/settings' },
    ];

    const menuItemsGuest = [
        { Icon: House, label: 'Главная', path: '/feed' },
        { Icon: MagnifyingGlass, label: 'Поиск', path: '/search' },
    ];

    const menu = isAuth ? menuItems : menuItemsGuest;

    return (
        <Sheet
            component="aside"
            className="app-desktop app-desktop__left"
            sx={{
                width: 250,
                height: '100dvh',
                position: 'relative',
                px: 2,
                py: 4,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'none',
                backgroundColor: 'transparent',
            }}
        >
            <div>
                <div style={{ paddingLeft: '16px', marginBottom: '1rem' }}>
                    <Logo />
                </div>

                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className={hover ? 'list-hover' : ''}
                >
                    <List
                        sx={{
                            '--ListItem-radius': '50px',
                            '--ListItem-minHeight': '48px',
                            gap: 1.5,
                        }}
                    >
                        {menu.map((item, index) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return <ButtonBar {...item} isActive={isActive} key={index} unreadMessages={item.unreadMessages ?? false} />
                        })}
                    </List>
                </div>
            </div>
        </Sheet >
    );
}

export default DesktopLeftBar;
