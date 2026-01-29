import { Typography, Input, Box, Sheet, CircularProgress, FormControl, FormHelperText, Switch } from '@mui/joy';
import { WarningCircle } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';

import ModalCode from './Password/ModalCode';
import WelcomeBlock from './Password/WelcomeBlock';
import WritePasswordBlock from './Password/WritePasswordBlock';

export default function PageSettingsProfilePassword() {
    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [usePassword, setUsePassword] = useState(false);

    const changeUsePassword = () => {
        setOpenModal(true);
        setUsePassword(!usePassword);
    }

    const sxBoxPassword = () => {
        if (!usePassword) {
            return {
                opacity: .3,
                pointerEvents: 'none'
            }
        }

        return {}
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
                        <Sheet sx={{ p: 2, borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', mb: '2rem' }}>
                            <Box
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography>Использовать пароль</Typography>
                                <Switch
                                    checked={usePassword}
                                    onChange={changeUsePassword}
                                />
                            </Box>
                        </Sheet>
                        <Box sx={sxBoxPassword}>
                            <WritePasswordBlock />
                        </Box>
                        <ModalCode openModal={openModal} setOpenModal={setOpenModal} />
                    </>
                )}
            </LayoutSettings>
        </AppProfile>
    )
}
