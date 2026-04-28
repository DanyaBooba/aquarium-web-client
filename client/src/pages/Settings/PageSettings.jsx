import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/auth/useLogout'
import { AppProfile } from '../../components/app/App'
import { List, ListItemButton, ListItemDecorator, Typography, Sheet, Avatar } from '@mui/joy'
import { User, Devices, Image, SignOut, CaretRight, Palette, Question, ChatCircleDots } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@mui/joy/styles';
import { useState } from 'react'
import ModalConfirmDelete from '../../components/module/ModalConfirmDelete/ModalConfirmDelete'

const MotionContainer = motion.div

function SettingsItem({ icon, bgColor, label, onClick, disabled = false }) {
    return (
        <ListItemButton color="neutral" onClick={onClick} sx={{ py: 1, px: 3 }} disabled={disabled}>
            <ListItemDecorator>
                <Avatar size="sm" sx={{ bgcolor: bgColor }}>
                    {icon}
                </Avatar>
            </ListItemDecorator>
            <Typography level="body-md" sx={{ flex: 1 }}>
                {label}
            </Typography>
            <CaretRight size={16} color="#999" />
        </ListItemButton>
    )
}

function SettingsList({ onSelect }) {
    const handleLogout = useLogout();
    const theme = useTheme();

    const [openModalExit, setOpenModalExit] = useState(false);

    const handlerClickExit = () => setOpenModalExit(true);

    return (
        <>
            {/* <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                <List>
                    <SettingsItem
                        icon={<UserPlusIcon size={20} />}
                        bgColor={theme.colors.settings.language}
                        label="Добавить аккаунт"
                        onClick={() => onSelect('/settings/profile')}
                    />
                </List>
            </Sheet> */}
            <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                <List>
                    <SettingsItem
                        icon={<User size={20} />}
                        bgColor={theme.colors.settings.profile}
                        label="Профиль"
                        onClick={() => onSelect('/settings/profile')}
                    />
                    <SettingsItem
                        icon={<Devices size={20} />}
                        bgColor={theme.colors.settings.devices}
                        label="Устройства"
                        onClick={() => onSelect('/settings/devices')}
                    />
                    {/* <SettingsItem
                        icon={<LockKey size={20} />}
                        bgColor={theme.colors.settings.privacy}
                        label="Конфиденциальность"
                        onClick={() => console.log('Конфиденциальность')}
                        disabled={true}
                    /> */}
                    {/* <SettingsItem
                        icon={<Bell size={20} />}
                        bgColor={theme.colors.settings.notifications}
                        label="Уведомления"
                        onClick={() => onSelect('/settings/notifications')}
                    /> */}
                </List>
            </Sheet>
            <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                <List>
                    <SettingsItem
                        icon={<Image size={20} />}
                        bgColor={theme.colors.settings.appearance}
                        label="Персонализация"
                        onClick={() => onSelect('/settings/appearance')}
                    />
                    <SettingsItem
                        icon={<Palette size={20} />}
                        bgColor={theme.colors.settings.themes}
                        label="Темы"
                        onClick={() => onSelect('/settings/theme')}
                    />
                </List>
            </Sheet>
            <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                <List>
                    {/* <SettingsItem
                        icon={<DeviceMobileIcon size={20} />}
                        bgColor={theme.colors.settings.notifications}
                        label="Приложения"
                        onClick={() => onSelect('/settings/apps')}
                    /> */}
                    <SettingsItem
                        icon={<Question size={20} />}
                        bgColor={theme.colors.settings.profile}
                        label="Аквариум FAQ"
                        onClick={() => onSelect('/settings/faq')}
                    />
                    <SettingsItem
                        icon={<ChatCircleDots size={20} />}
                        bgColor={theme.colors.settings.privacy}
                        label="Задать вопрос"
                        onClick={() => onSelect('/settings/contact')}
                    />
                </List>
            </Sheet>
            <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                <List>
                    <SettingsItem
                        icon={<SignOut size={20} />}
                        bgColor={theme.colors.settings.exit}
                        label="Выйти"
                        onClick={handlerClickExit}
                    />
                </List>
            </Sheet>
            <ModalConfirmDelete
                open={openModalExit}
                setOpen={setOpenModalExit}
                onDelete={handleLogout}
                title="Подтвердите выход"
                desc="Вы действительно хотите выйти из аккаунта?"
                buttonActiveText="Выйти"
            />
        </>
    )
}

function PageSettings() {
    const navigate = useNavigate()

    return (
        <AppProfile title="Настройки" desc="Настройте свой профиль и интерфейс социальной сети Аквариум">
            <Typography level="h4" sx={{ mt: 2 }}>
                Настройки
            </Typography>

            <AnimatePresence mode="wait" initial={false}>
                <MotionContainer
                    key="main"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <SettingsList
                        onSelect={(screen) => {
                            navigate(screen, { state: { direction: 1 } })
                        }}
                    />
                </MotionContainer>
            </AnimatePresence>
        </AppProfile>
    )
}

export default PageSettings
