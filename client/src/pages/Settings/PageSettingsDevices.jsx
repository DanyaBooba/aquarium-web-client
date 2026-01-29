import {
    Typography,
    Stack,
    Box,
    CircularProgress,
    Sheet,
} from '@mui/joy';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { useEffect, useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';
import DeviceItem from './Devices/DeviceItem';
import { AnimatePresence, motion } from 'framer-motion';
import { WarningCircle } from '@phosphor-icons/react';

function ShowDevices({ currentSession = {}, otherSessions = [], onDelete = () => { }, canCancel = false }) {
    return (
        <Stack spacing={2} mt={2}>
            {!canCancel && (

                <Sheet
                    variant="soft"
                    color="warning"
                    sx={{
                        borderRadius: '12px',
                        p: 2,
                        mb: 2,
                    }}
                >
                    <Box>
                        <Typography level="title-md" fontWeight="md" mb={0.5} startDecorator={<WarningCircle
                            size={20}
                            weight="fill"
                        />}>
                            Завершение сеансов временно недоступно
                        </Typography>

                        <Typography level="body-sm">
                            В целях безопасности завершать прошлые сеансы можно только
                            по прошествии <b>48 часов</b> с момента последней авторизации.
                        </Typography>
                    </Box>
                </Sheet>
            )}
            {currentSession && (
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <Typography level="body-xs" sx={{ textTransform: 'uppercase', mt: 1, mb: '.5rem', pl: '17.2px' }}>
                        Активная сессия
                    </Typography>
                    <DeviceItem
                        session={currentSession}
                    />
                </Box>
            )}
            {Array.isArray(otherSessions) && otherSessions.length > 0 && (
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <Typography level="body-xs" sx={{ textTransform: 'uppercase', mt: 1, mb: '.5rem', pl: '17.2px' }}>
                        Прочие сессии
                    </Typography>
                    <AnimatePresence initial={false}>
                        {otherSessions.map((session, index) => (
                            <motion.div
                                key={session.id}
                                initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                <DeviceItem
                                    session={session}
                                    onDelete={onDelete}
                                    cancel={true}
                                    canCancel={canCancel}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>
            )
            }
        </Stack >
    )
}

export default function PageSettingsDevices() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [currentSession, setCurrentSession] = useState({});
    const [otherSessions, setOtherSessions] = useState([]);
    const [canCancel, setCanCancel] = useState(false);

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true)
            try {
                const accessToken = localStorage.getItem('accessToken')

                const res = await fetch(`https://mini.aquarium.org.ru/api/user/tokens`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!res.ok) throw new Error('Ошибка сервера');

                const data = await res.json();

                if (data?.success) {
                    setCurrentSession(data?.currentSession);
                    setOtherSessions(data?.otherSessions);
                    setCanCancel(data?.canCancel);
                }
            } catch (err) {
                setError('Ошибка при получении сессий');
            } finally {
                setLoading(false);
            }
        }

        fetchSessions();
    }, []);

    const onDelete = (id) => {
        setOtherSessions(prev => prev.filter(c => c.id !== id));
    }

    return (
        <AppProfile title="Устройства" desc="Устройства — социальная сеть Аквариум">
            <LayoutSettings header="Устройства">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError />
                ) : (
                    <ShowDevices
                        currentSession={currentSession ?? {}}
                        otherSessions={otherSessions ?? []}
                        onDelete={onDelete}
                        canCancel={canCancel}
                    />
                )}
            </LayoutSettings>
        </AppProfile>
    );
}
