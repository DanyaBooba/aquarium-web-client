import { useNavigate } from 'react-router-dom';
import { Sheet, Typography, Box, Button, useTheme } from '@mui/joy';
import { Key, ChatCircleText, PencilSimpleLine, ShieldCheck, UsersThree } from '@phosphor-icons/react';
import { useAuth } from '../../../hooks/auth/useAuth';

function TelegramIcon({ color = 'white' }) {
    return (
        <svg
            viewBox="0 0 543 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.3284 193.722C183.089 130.217 280.285 88.35 328.917 68.1222C467.773 10.3674 496.625 0.334815 515.431 0.00353222C519.568 -0.0693298 528.816 0.95574 534.806 5.8167C539.865 9.92121 541.257 15.4658 541.923 19.3573C542.589 23.2488 543.418 32.1138 542.759 39.0407C535.234 118.102 502.675 309.965 486.111 398.515C479.102 435.984 465.301 448.548 451.941 449.777C422.905 452.449 400.856 430.588 372.733 412.153C328.727 383.306 303.866 365.349 261.15 337.2C211.784 304.669 243.786 286.789 271.919 257.569C279.282 249.921 407.215 133.556 409.691 123C410.001 121.68 410.288 116.759 407.365 114.16C404.441 111.562 400.126 112.45 397.012 113.157C392.599 114.159 322.298 160.625 186.11 252.556C166.155 266.259 148.081 272.935 131.887 272.585C114.034 272.199 79.6928 262.491 54.1636 254.192C22.8511 244.014 -2.03552 238.632 0.131547 221.346C1.26029 212.343 13.6592 203.135 37.3284 193.722Z"
                fill={color}
            />
        </svg>
    );
}

function BarGuest() {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography level="title-md" mb={2}>
                Мы тебя ждали
            </Typography>
            <Typography level="body-sm" mb={2}>
                Мессенджер, который мы придумали для тебя:
            </Typography>
            <Typography level="body-sm" mb={1.5} startDecorator={<Key size={16} />}>
                Вход в 1 клик
            </Typography>
            <Typography level="body-sm" mb={1.5} startDecorator={<ChatCircleText size={16} />}>
                Общение без чужих глаз
            </Typography>
            <Typography level="body-sm" mb={1.5} startDecorator={<PencilSimpleLine size={16} />}>
                Делись важным для тебя
            </Typography>
            <Typography level="body-sm" mb={1.5} startDecorator={<ShieldCheck size={16} />}>
                Личное остается личным
            </Typography>
            <Typography level="body-sm" mb={1.5} startDecorator={<UsersThree size={16} />}>
                Тут комфортно для тебя
            </Typography>
            <Button
                onClick={() => navigate('/auth')}
                sx={{
                    width: '100%',
                    borderRadius: '50px',
                    mt: 2,
                }}
            >
                Присоединиться
            </Button>
        </Box>
    )
}

function BarLogined() {
    const theme = useTheme();
    const isDark = theme.colorSchemes?.dark && theme.palette.mode === 'dark';

    const telegramColor = isDark ? '#dedede' : '#229ED9';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Телеграм канал */}
            <Sheet
                variant="plain"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'visible',
                    '&:has(.decor-button:hover) .decor': {
                        transform: 'scale(1.08) rotate(6deg)',
                    },
                }}
            >
                <Typography level="title-sm" mb={0.5}>
                    Аквариум в Телеграме
                </Typography>

                <Typography level="body-xs" color="neutral" mb={1.5}>
                    Новости, обновления и жизнь проекта.
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    flexDirection: 'row',
                }}>
                    <Button
                        size="sm"
                        variant="outlined"
                        className="decor-button"
                        sx={{
                            borderRadius: '50px',
                            fontSize: '12px',
                            px: 1.5,
                            py: 0,
                        }}
                        component="a"
                        href="https://t.me/aquariumsocial"
                        target="_blank"
                    >
                        Перейти в канал
                    </Button>
                    <Box
                        className="decor"
                        sx={{
                            width: 26,
                            height: 26,
                            transition: 'transform .15s ease',
                            pointerEvents: 'none',
                        }}
                    >
                        <TelegramIcon color={telegramColor} />
                    </Box>
                </Box>
            </Sheet>

            {/* Телеграм стикеры */}
            <Sheet
                variant="plain"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'visible',
                    '&:has(.decor-button:hover) .decor': {
                        transform: 'scale(1.08) rotate(6deg)',
                    },
                }}
            >
                <Typography level="title-sm" mb={0.5}>
                    Стикеры Аквариума
                </Typography>

                <Typography level="body-xs" color="neutral" mb={1.5}>
                    Немного иронии и эмоций для чатов.
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    flexDirection: 'row',
                }}>
                    <Button
                        size="sm"
                        variant="outlined"
                        className="decor-button"
                        sx={{
                            borderRadius: '50px',
                            fontSize: '12px',
                            px: 1.5,
                            py: 0,
                        }}
                        component="a"
                        href="https://t.me/addstickers/aquariumsocial"
                        target="_blank"
                    >
                        Добавить стикеры
                    </Button>
                    <Box
                        className="decor"
                        sx={{
                            display: 'flex',
                            width: 32,
                            height: 'auto',
                            transition: 'transform .15s ease',
                            pointerEvents: 'none',
                        }}
                    >
                        <img
                            src="/img/decor/sticker.png"
                            alt=""
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                </Box>
            </Sheet>
        </Box>
    );
}

function DesktopRightBar() {
    const { isAuth } = useAuth();

    return (
        <Sheet
            component="aside"
            className={`app-desktop app-desktop__right app-desktop__right-${isAuth ? 'auth' : 'guest'}`}
            sx={{
                width: 300,
                height: '100vh',
                position: 'relative',
                px: 2,
                py: 4,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                boxShadow: 'none',
                backgroundColor: 'transparent',
            }}
        >
            {isAuth && <BarLogined />}
            {!isAuth && <BarGuest />}
        </Sheet>
    );
}

export default DesktopRightBar;
