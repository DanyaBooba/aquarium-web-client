import { Avatar, Box, Button, ListItem, ListItemDecorator, Sheet, Stack, Typography } from "@mui/joy";
import { AndroidLogo, Desktop, DeviceMobile, LinuxLogo, WindowsLogo } from "@phosphor-icons/react";
import ModalConfirmDelete from "../../../components/module/ModalConfirmDelete/ModalConfirmDelete";
import { useState } from "react";

function AppleIcon() {
    return (
        <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '3px' }}>
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
    )
}

function DotIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="64 64 128 128" style={{ opacity: '.5' }}>
            <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128Z"></path>
        </svg>
    )
}

const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();

    const isSameYear = date.getFullYear() === now.getFullYear();

    const dayMonth = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short'
    }).format(date).replace('.', '');

    const time = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    if (isSameYear) {
        return `${dayMonth} в ${time}`;
    }

    return `${dayMonth} ${date.getFullYear()} в ${time}`;
};

const formatIP = (ip) => {
    return ip?.replace('::ffff:', '');
};

const getDeviceConfig = (sessionData) => {
    const os = sessionData?.os?.toLowerCase() || '';
    const device = sessionData?.device?.toLowerCase() || '';

    if (os.includes('mac') || os.includes('ios') || device.includes('iphone') || device.includes('ipad')) {
        return {
            icon: <AppleIcon />,
            color: 'neutral',
            typeLabel: 'Apple Device'
        };
    }

    if (os.includes('windows')) {
        return {
            icon: <WindowsLogo weight="fill" size={24} />,
            color: 'primary',
            typeLabel: 'Windows PC'
        };
    }

    if (os.includes('android')) {
        return {
            icon: <AndroidLogo weight="fill" size={24} />,
            color: 'success',
            typeLabel: 'Android'
        };
    }

    if (os.includes('linux')) {
        return {
            icon: <LinuxLogo weight="fill" size={24} />,
            color: 'warning',
            typeLabel: 'Linux'
        };
    }

    if (device.includes('mobile')) return { icon: <DeviceMobile size={24} />, color: 'neutral', typeLabel: 'Phone' };

    return { icon: <Desktop size={24} />, color: 'neutral', typeLabel: 'Desktop' };
};

export default function DeviceItem({ session, cancel = false, canCancel = false, onDelete = () => { } }) {
    const [openModal, setOpenModal] = useState(false);

    const sessionInfo = session.session || {};
    const { icon, color, typeLabel } = getDeviceConfig(sessionInfo);
    const title = `${sessionInfo.os || 'Unknown OS'} ${sessionInfo.osVersion || ''}`.trim();
    const dateStr = formatDate(session.created_at);
    const ipStr = formatIP(session.ipaddress);
    const browserStr = sessionInfo.browser || 'Неизвестный браузер';

    const handlerCancelClick = () => setOpenModal(true);

    const handlerCancel = async () => {
        if (onDelete) {
            const fetchDeleteSession = async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    if (!accessToken) return;

                    const res = await fetch(`https://mini.aquarium.org.ru/api/user/tokens?id=${session?.id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });

                    if (!res.ok) throw new Error("Ошибка при удалении сессии");
                    const data = await res.json();

                    if (data?.success) {
                        onDelete(session?.id);
                    }
                } catch (err) {

                }
            }

            fetchDeleteSession();
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                borderRadius: '12px',
                p: 1,
                mb: 2,
                border: 'none'
            }}
        >
            <ListItem sx={{ alignItems: 'flex-start', px: 2, gap: 2, py: 1.5 }}>

                <ListItemDecorator sx={{ alignSelf: 'center' }}>
                    <Avatar variant="soft" color={color} size="lg">
                        {icon}
                    </Avatar>
                </ListItemDecorator>

                <Stack spacing={0.5} sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography level="title-md" fontWeight="md">
                            {title}
                        </Typography>
                    </Stack>

                    <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: .5,
                            alignItems: 'center'
                        }}
                    >
                        <span>{browserStr}</span>
                        <DotIcon />
                        <span>{ipStr}</span>
                        <DotIcon />
                        <span>{dateStr}</span>
                    </Typography>

                    {cancel && (
                        <Box sx={{ pt: 1 }}>
                            <Button
                                color="danger"
                                size="sm"
                                variant="outlined"
                                onClick={handlerCancelClick}
                                disabled={!canCancel}
                                sx={{
                                    borderRadius: '20px',
                                    px: 2,
                                    fontSize: 'xs'
                                }}
                            >
                                Завершить сеанс
                            </Button>
                        </Box>
                    )}
                </Stack>
            </ListItem>
            <ModalConfirmDelete
                open={openModal}
                setOpen={setOpenModal}
                onDelete={handlerCancel}
                desc="Вы действительно хотите завершить сессию?"
            />
        </Sheet>
    );
}
