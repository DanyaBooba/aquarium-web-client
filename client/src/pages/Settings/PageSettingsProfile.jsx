import { Typography, Input, Box, ListItemButton, Sheet, List, CircularProgress, FormControl, FormHelperText } from '@mui/joy';
import { WarningCircle } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { CaretRight } from '@phosphor-icons/react';
import { useProfile } from '../../hooks/profile/useProfile';
import { useEffect, useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/apiClient';

function MyInput({ sx, error, ...props }) {
    return (
        <FormControl error={error}>
            <Input
                sx={{
                    px: 2,
                    py: 1.5,
                    boxShadow: 'none',
                    borderRadius: '50px',
                    ...sx
                }}
                {...props}
            />
            {error && (
                <FormHelperText>
                    <WarningCircle size={16} style={{ mr: 0.5 }} />
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    );
}

function SettingsItem({ label, onClick, color = '' }) {
    return (
        <ListItemButton color="neutral" onClick={onClick} sx={{ py: 1, px: 3 }}>
            <Typography level="body-md" sx={{ flex: 1 }} color={color}>
                {label}
            </Typography>
            <CaretRight size={16} color="#999" />
        </ListItemButton>
    );
}

function PageSettingsProfile() {
    const navigation = useNavigate();

    const { user, loading, error } = useProfile();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        description: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                username: user?.username || '',
                description: user?.description || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (!user || !isDirty) return;

        const timeout = setTimeout(() => {
            saveForm();
        }, 500);

        return () => clearTimeout(timeout);
    }, [form]);

    const saveForm = async () => {
        try {
            setFieldErrors({});
            setIsSaving(true);
            setSaveError(null);
            const res = await apiFetch('/api/profile', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(form)
            });


            const data = await res.json();

            setSaveError(data.error);
            setFieldErrors({
                firstName: data?.fields?.firstName ?? null,
                lastName: data?.fields?.lastName ?? null,
                username: data?.fields?.username ?? null,
                description: data?.fields?.description ?? null,
            });

            if (!res.ok) {
                throw new Error(data.error || 'Ошибка при сохранении');
            }
        } catch (err) {
            //
        } finally {
            setIsSaving(false);
        }
    };

    const isValidUsername = (value) => {
        if (value === '') return true;
        const regex = /^[a-z0-9_\-$]{1,20}$/;
        return regex.test(value);
    };

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        const newForm = { ...form, [field]: value };
        const newErrors = { ...fieldErrors };

        if (field === 'username') {
            if (value !== '' && !isValidUsername(value)) {
                newErrors.username = 'Недопустимые символы';
            } else {
                delete newErrors.username;
            }
        } else if (['firstName', 'lastName', 'description'].includes(field) && value.length > 255) {
            newErrors[field] = 'Поле не должно превышать 255 символов';
        } else {
            delete newErrors[field];
        }

        setFieldErrors(newErrors);
        setForm(newForm);
        setIsDirty(true);
    };

    return (
        <AppProfile title="Настройки профиля" desc="Настройки профиля в социальной сети Аквариум">
            <LayoutSettings header="Профиль">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError />
                ) : user ? (
                    <>
                        {saveError && <Typography color="danger" mb={2}>{saveError}</Typography>}
                        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Typography level="body-xs" sx={{ textTransform: 'uppercase', pl: 2.15 }}>
                                Личные данные
                            </Typography>
                            <MyInput
                                placeholder="Имя"
                                value={form.firstName}
                                onChange={handleChange('firstName')}
                                error={fieldErrors?.firstName}
                            />
                            <MyInput
                                placeholder="Фамилия"
                                value={form.lastName}
                                onChange={handleChange('lastName')}
                                error={fieldErrors?.lastName}
                            />
                        </Box>

                        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Typography level="body-xs" sx={{ textTransform: 'uppercase', pl: 2.5 }}>Имя пользователя</Typography>
                            <MyInput
                                placeholder="superman"
                                value={form.username}
                                onChange={handleChange('username')}
                                error={fieldErrors?.username}
                            />
                            <Typography level="body-xs" sx={{ pl: 2.5 }}>
                                Может содержать только латинские буквы в нижнем регистре и цифры.
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Typography level="body-xs" sx={{ textTransform: 'uppercase', pl: 2.5 }}>Описание профиля</Typography>
                            <MyInput
                                placeholder="Расскажите о себе..."
                                value={form.description}
                                onChange={handleChange('description')}
                                error={fieldErrors?.description}
                            />
                            <Typography level="body-xs" sx={{ pl: 2.5 }}>
                                Краткая информация о вас, к примеру возраст, город проживания, сфера деятельности.
                            </Typography>
                        </Box>

                        <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                            <List>
                                <SettingsItem
                                    label="Установить пароль"
                                    onClick={() => navigation('/settings/profile/password')}
                                />
                                {/* <SettingsItem
                                    label="Сменить почту"
                                    onClick={() => navigation('/settings/profile')}
                                /> */}
                            </List>
                        </Sheet>

                        <Sheet variant="plain" sx={{ borderRadius: '24px', py: 1, my: 2 }}>
                            <List>
                                <SettingsItem
                                    label="Удалить аккаунт"
                                    color="danger"
                                    onClick={() => navigation('/settings/profile/delete')}
                                />
                            </List>
                        </Sheet>
                    </>
                ) : null}
            </LayoutSettings>
        </AppProfile>
    );
}

export default PageSettingsProfile;
