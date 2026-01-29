import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, List, ListItem, ListItemButton, ListItemDecorator } from '@mui/joy';
import { House, PencilLine, User, Bell, MagnifyingGlass, GearSix, ChatCircle } from '@phosphor-icons/react';
import Logo from '../../module/Logo/Logo';
import { useAuth } from '../../../hooks/auth/useAuth';

function ButtonBar({ label, path, Icon, isActive }) {
    const navigate = useNavigate();
    const location = useLocation();

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
                    <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
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
        { Icon: ChatCircle, label: 'Сообщения', path: '/messages' },
        { Icon: PencilLine, label: 'Создать запись', path: '/post/create' },
        { Icon: MagnifyingGlass, label: 'Поиск', path: '/search' },
        // { Icon: Bell, label: 'Уведомления', path: '/notifications' },
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
                height: '100vh',
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
                <div style={{ paddingLeft: '16px', marginBottom: '2rem' }}>
                    <Logo noRandom={false} />
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
                            return <ButtonBar {...item} isActive={isActive} key={index} />
                        })}
                    </List>
                </div>
            </div>
        </Sheet >
    );
}

export default DesktopLeftBar;
