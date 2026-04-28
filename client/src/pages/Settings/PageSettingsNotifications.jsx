import React, { useState } from 'react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { Box, Typography, Switch, Sheet } from '@mui/joy';

function ShowBlock({ title = '', list = [] }) {
    return (
        <>
            <Typography level="body-xs" sx={{ textTransform: 'uppercase', pl: '17.2px', mb: '1rem' }}>{title}</Typography>
            <Sheet sx={{ p: 2, borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', mb: '2rem' }}>
                {list.map((item, index) => (
                    <Box
                        key={`${title}-${index}`}
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography>{item?.title}</Typography>
                        <Switch
                            checked={item?.checked}
                            onChange={() => item?.onChange(!item?.checked)}
                        />
                    </Box>
                ))}
            </Sheet>
        </>
    )
}

function PageSettingsNotifications() {
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);

    const listEmail = [
        { title: 'Авторизация в аккаунт', checked: emailNotif, onChange: setEmailNotif },
        { title: 'Изменение личных данных', checked: smsNotif, onChange: setSmsNotif },
    ];

    const [emailNotif3, setEmailNotif3] = useState(true);
    const [smsNotif3, setSmsNotif3] = useState(false);

    const listWeb = [
        { title: 'Авторизация в аккаунт', checked: emailNotif3, onChange: setEmailNotif3 },
        { title: 'Изменение личных данных', checked: smsNotif3, onChange: setSmsNotif3 },
    ];

    const [emailNotif2, setEmailNotif2] = useState(true);
    const [smsNotif2, setSmsNotif2] = useState(false);

    const listApp = [
        { title: 'Авторизация в аккаунт', checked: emailNotif2, onChange: setEmailNotif2 },
        { title: 'Изменение личных данных', checked: smsNotif2, onChange: setSmsNotif2 },
    ];

    return (
        <AppProfile title="Настройки уведомлений" desc="Настройки уведомлений в социальной сети Аквариум">
            <LayoutSettings header="Уведомления">
                <ShowBlock
                    title="Почта"
                    list={listEmail}
                />
                <ShowBlock
                    title="Веб-клиент"
                    list={listWeb}
                />
                <ShowBlock
                    title="Мобильное приложение"
                    list={listApp}
                />
            </LayoutSettings>
        </AppProfile>
    );
}

export default PageSettingsNotifications;
