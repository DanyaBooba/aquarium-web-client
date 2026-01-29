import { useLocation, Outlet } from 'react-router-dom';
import { Container } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';

import DesktopLeftBar from '../includes/DesktopLeftBar/DesktopLeftBar';
import DesktopRightBar from '../includes/DesktopRightBar/DesktopRightBar';
import ProfileNav from '../includes/ProfileNav/ProfileNav';
import ProfileHeader from '../includes/ProfileHeader/ProfileHeader';
import MessageNotification from '../module/MessageNotification/MessageNotification';

export default function MainLayout() {
    const location = useLocation();

    const showNav = !window.location.href.includes('chat')

    return (
        <div className="app">
            <DesktopLeftBar />

            <Container maxWidth="sm" className="profile" sx={{ px: 0, py: 0 }}>
                <ProfileHeader />
                <MessageNotification />

                <main style={{ position: 'relative' }}>
                    <AnimatePresence>
                        <motion.div
                            key={location.pathname}
                            initial={{ scale: 0.99, opacity: 0.95 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            style={{ height: '100%' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>

                {showNav && <ProfileNav />}
            </Container>

            <DesktopRightBar />
        </div>
    );
}
