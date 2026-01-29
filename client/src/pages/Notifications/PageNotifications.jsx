import { AppProfile } from '../../components/app/App'
import { Stack, Sheet, Typography, Avatar, ListItem, ListItemDecorator } from '@mui/joy'
import { SignIn, Trophy, Info } from '@phosphor-icons/react'
import { useTheme } from '@mui/joy/styles';

function NotificationItem({ icon, bgColor, title, description }) {
    return (
        <Sheet variant="plain" sx={{ borderRadius: '12px', p: 1, my: 2 }}>
            <ListItem sx={{ alignItems: 'flex-start', px: 2, gap: 2, py: 1.5 }}>
                <ListItemDecorator>
                    <Avatar sx={{ bgcolor: bgColor }} size="sm">
                        {icon}
                    </Avatar>
                </ListItemDecorator>
                <Stack spacing={0.5}>
                    <Typography level="title-md" fontWeight="md">{title}</Typography>
                    <Typography level="body-sm" color="neutral">{description}</Typography>
                </Stack>
            </ListItem>
        </Sheet>
    )
}

function NotificationsList() {
    const theme = useTheme();

    return (
        <>
            <NotificationItem
                icon={<SignIn size={18} />}
                bgColor={theme.colors.settings.profile}
                title="Новый вход в аккаунт"
                description="Кто-то вошел в ваш аккаунт с нового устройства."
            />
            <NotificationItem
                icon={<Trophy size={18} />}
                bgColor={theme.colors.settings.devices}
                title="Поздравляем!"
                description="Вы получили достижение: 'Первые шаги'"
            />
            <NotificationItem
                icon={<Info size={18} />}
                bgColor={theme.colors.settings.appearance}
                title="Обновление приложения"
                description="Вышла новая версия приложения с улучшениями безопасности."
            />
        </>
    )
}

function PageNotifications() {
    return (
        <AppProfile title="Уведомления" desc="Все уведомления о событиях, связанных с вашим аккаунтом в социальной сети Аквариум мини">
            <Typography level="h4" my={2}>Уведомления</Typography>
            <NotificationsList />
        </AppProfile>
    )
}

export default PageNotifications
