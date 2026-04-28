import { Typography, Input, Box, Sheet, CircularProgress, FormControl, FormHelperText, Switch, Button } from '@mui/joy';
import { WarningCircle } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';

import ShowModal from './Delete/ShowModal';
import WelcomeBlock from './Delete/WelcomeBlock';
import { useCurrentSession } from '../../hooks/profile/useCurrentSession';

function CancelDelete() {
    return (
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
                    Удаление аккаунта временно недоступно
                </Typography>

                <Typography level="body-sm">
                    В целях безопасности удалить аккаунт можно только
                    по прошествии <b>48 часов</b> с момента последней авторизации.
                </Typography>
            </Box>
        </Sheet>
    )
}

export default function PageSettingsProfileDelete() {
    const { canCancel, loading, error } = useCurrentSession();

    const [showModal, setShowModal] = useState(false);

    return (
        <AppProfile title="Удалить аккаунт" desc="Удалить аккаунт в социальной сети Аквариум">
            <LayoutSettings header="Удалить аккаунт" backUrl="/settings/profile">
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
                        <Button
                            onClick={() => setShowModal(true)}
                            color="danger"
                            disabled={!canCancel}
                            sx={{ borderRadius: '50px', px: 2, py: 1.5, width: '100%', mt: 2 }}
                        >
                            Удалить аккаунт
                        </Button>

                        <ShowModal openModal={showModal} setOpenModal={setShowModal} />
                    </>
                )}
            </LayoutSettings>
        </AppProfile>
    )
}
