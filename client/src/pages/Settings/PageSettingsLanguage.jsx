import { useState, useEffect } from 'react';
import { RadioGroup, Radio, Stack, Typography } from '@mui/joy';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';

const availableLanguages = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
];

function PageSettingsLanguage() {
    const [language, setLanguage] = useState('ru');

    useEffect(() => {
        const saved = localStorage.getItem('app_language');
        if (saved) setLanguage(saved);
    }, []);

    const handleChange = (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        localStorage.setItem('app_language', selectedLang);
        // Здесь можно вызвать i18n.changeLanguage(selectedLang), если используешь i18next
    };

    return (
        <AppProfile>
            <LayoutSettings header="Язык">
                <Stack spacing={2} mt={2}>
                    <Typography level="title-md">Выберите язык интерфейса</Typography>
                    <RadioGroup value={language} onChange={handleChange}>
                        {availableLanguages.map((lang) => (
                            <Radio key={lang.code} value={lang.code} label={lang.label} />
                        ))}
                    </RadioGroup>
                </Stack>
            </LayoutSettings>
        </AppProfile>
    );
}

export default PageSettingsLanguage;
