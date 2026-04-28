import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/app/ThemeProvider'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { LayoutGroup } from 'framer-motion';

import MainLayout from './components/layout/MainLayout';

import { RoutesAuth } from './routes/RoutesAuth'
import { RoutesProfile } from './routes/RoutesProfile'
import { RoutesProfileSettings } from './routes/RoutesProfileSettings'
import { RoutesPost } from './routes/RoutesPost'
import { RoutesMessages } from './routes/RoutesMessages';

import { SocketProvider } from './components/app/SocketProvider';
import { NotificationProvider } from './components/app/NotificationProvider';
import { UnreadMessagesProvider } from './components/app/UnreadMessagesProvider';
import { CallProvider } from './components/app/CallProvider';

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>

                {RoutesAuth}

                <Route element={<SocketProvider />}>
                    <Route element={<CallProvider />}>
                        <Route element={<NotificationProvider />}>
                            <Route element={<UnreadMessagesProvider />}>
                            <Route element={<MainLayout />}>
                                {RoutesProfile}
                                {RoutesProfileSettings}
                                {RoutesPost}
                                {RoutesMessages}
                            </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/feed" replace />} />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <LayoutGroup>
                        <AnimatedRoutes />
                    </LayoutGroup>
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    )
}

export default App
