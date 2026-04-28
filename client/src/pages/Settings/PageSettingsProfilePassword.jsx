import { Typography, Box, Sheet, CircularProgress, Switch } from '@mui/joy';
import { WarningCircle } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { useEffect, useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';

// import ModalCode from './Password/ModalCode';
import WelcomeBlock from './Password/WelcomeBlock';
import WritePasswordBlock from './Password/WritePasswordBlock';
import { useCurrentSession } from '../../hooks/profile/useCurrentSession';
import { useHasPassword } from '../../hooks/profile/useHasPassword';
import { apiFetch } from '../../utils/apiClient';

function CancelDelete() {
    return (
        <Sheet
            variant="soft"
            color="warning"
            sx={{
                borderRadius: '24px',
                p: 2,
                mb: 2,
            }}
        >
            <Box>
                <Typography level="title-md" fontWeight="md" mb={0.5} startDecorator={<WarningCircle
                    size={20}
                    weight="fill"
                />}>
                    Смена пароля временно недоступна
                </Typography>

                <Typography level="body-sm">
                    В целях безопасности сменить пароль можно только
                    по прошествии <b>48 часов</b> с момента последней авторизации.
                </Typography>
            </Box>
        </Sheet>
    )
}

export default function PageSettingsProfilePassword() {
    const { canCancel, loading: loading1, error: error1 } = useCurrentSession();
    const { hasPassword, loading: loading2, error: error2 } = useHasPassword();

    const loading = loading1 && loading2
    const error = error1 || error2

    const [usePassword, setUsePassword] = useState(false);

    useEffect(() => {
        setUsePassword(hasPassword);
    }, [hasPassword]);

    const changeUsePassword = () => {
        if (usePassword) {
            const handleSubmit = async () => {
                try {
                    const response = await apiFetch('/api/profile/password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            password: '',
                        })
                    });

                    const data = await response.json();

                    if (data.status) {
                        alert('Пароль успешно удален');
                    }

                    if (!response.ok) {
                        throw new Error('Ошибка обновления пароля');
                    }
                }
                catch (err) {
                    console.error(err.message);
                }
            };

            handleSubmit();
        }

        setUsePassword(!usePassword);
    }

    const sxBoxPassword = () => {
        if (!usePassword || !canCancel) {
            return {
                opacity: .3,
                pointerEvents: 'none',
                transition: '.15s ease-out'
            }
        }

        return {
            transition: '.15s ease-out'
        }
    }

    return (
        <AppProfile title="Настройки пароля" desc="Настройки пароля в социальной сети Аквариум">
            <LayoutSettings header="Установить пароль" backUrl="/settings/profile">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError />
                ) : (
                    <>
                        <WelcomeBlock />
                        {!canCancel && <CancelDelete />}
                        <Sheet sx={{ p: 2, borderRadius: '999px', display: 'flex', flexDirection: 'column', gap: '1rem', mb: '2rem' }}>
                            <Box
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography>Использовать пароль</Typography>
                                <Switch
                                    checked={usePassword}
                                    onChange={changeUsePassword}
                                    disabled={!canCancel}
                                />
                            </Box>
                        </Sheet>
                        <Box sx={sxBoxPassword}>
                            <WritePasswordBlock />
                        </Box>
                    </>
                )}
            </LayoutSettings>
        </AppProfile>
    )
}
