import { Link, Box } from '@mui/joy';
import { Bell } from '@phosphor-icons/react';
import Logo from '../../module/Logo/Logo';
import { useAuth } from '../../../hooks/auth/useAuth';
import { Link as RouterLink } from 'react-router-dom';

function ProfileHeader() {
    const currentPath = window.location.pathname;
    const { isAuth } = useAuth();

    const menuProfile = [
        // {
        //     href: '/search',
        //     Icon: MagnifyingGlass,
        //     label: 'Поиск',
        // },
        // {
        //     href: '/notifications',
        //     Icon: Bell,
        //     label: 'Уведомления',
        // },
    ];

    const menuGuest = [
        // {
        //     href: '/search',
        //     Icon: MagnifyingGlass,
        //     label: 'Поиск',
        // },
    ];

    const menu = isAuth ? menuProfile : menuGuest;

    return (
        <Box
            sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            className="profile__header"
        >
            <Logo noRandom={false} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 2 }}>
                {menu?.length > 0 && menu.map(({ href, Icon, label }, index) => {
                    const isActive = currentPath === href;
                    return (
                        <Link
                            key={index}
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
                            aria-label={label}
                        >
                            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}

export default ProfileHeader;
