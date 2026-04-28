import { Typography, Input, Box, ListItemButton, Sheet, List, CircularProgress, FormControl, FormLabel, FormHelperText, Textarea, Button, Select, Option } from '@mui/joy';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { CaretRight } from '@phosphor-icons/react';
import { useProfile } from '../../hooks/profile/useProfile';
import { useEffect, useState } from 'react';
import ServerError from '../../components/module/ServerError/ServerError';
import { apiFetch } from '../../utils/apiClient';

function Selector({ reason = null, setReason = () => { }, reasons = [] }) {
    return <Select
        placeholder="Причина обращения"
        value={reason}
        onChange={(_, val) => setReason(val)}
        variant="outlined"
        sx={{
            boxShadow: 'none',
            borderRadius: '50px',
            px: 2,
            py: 1.75,
            flex: '1',
            mb: 2,
            fontSize: '16px'
        }}
        slotProps={{
            listbox: {
                sx: {
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px'
                },
            },
        }}
    >
        {reasons.map((reason, index) => (
            <Option key={`reason-${index}`} value={reason?.value}>{reason?.name}</Option>
        ))}
    </Select>
}

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
                required
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


export default function PageSettingsContact() {
    const [send, setSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [reply, setReply] = useState(null);
    const [reason, setReason] = useState(null);

    const reasons = [
        { value: 'bug', name: 'Ошибка или сбой' },
        { value: 'question', name: 'Вопрос по работе сервиса' },
        { value: 'feature', name: 'Предложение или идея' },
        { value: 'account', name: 'Проблема с аккаунтом' },
        { value: 'content', name: 'Жалоба на контент' },
        { value: 'other', name: 'Другое' },
    ]

    const editValue = (e, setValue) => setValue(e.target.value);
    const showButton = () => title?.length > 0 && message?.length > 0 && reply?.length > 0 && reason?.length > 0

    const sendQuestion = () => {
        const fetch = async () => {
            setLoading(true);

            try {
                const response = await apiFetch('/api/profile/question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        message,
                        reply,
                        reason
                    })
                });

                const data = await response.json();

                if (!response.ok || data?.error) {
                    throw new Error(data?.error || 'Ошибка при отправке вопроса');
                }

                if (data?.status) {
                    setSend(true);
                    setError(null);
                }
            } catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        if (!send) fetch();
    }

    return (
        <AppProfile title="Задать вопрос" desc="Задать вопрос в социальной сети Аквариум">
            <LayoutSettings header="Задать вопрос">
                {error && <Typography color="danger" mb={2}>{error}</Typography>}
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <MyInput
                        placeholder="Кратко о вопросе"
                        value={title}
                        onChange={(e) => editValue(e, setTitle)}
                    />
                    <Textarea
                        maxRows={6}
                        minRows={4}
                        placeholder="Опишите проблему"
                        value={message}
                        onChange={(e) => editValue(e, setMessage)}
                        sx={{
                            py: '.75rem',
                            px: '1rem',
                            mb: 2,
                            borderRadius: '25px',
                            boxShadow: 'none',
                            transition: '.15s',
                        }}
                    />
                    <MyInput
                        placeholder="Контакт для ответа"
                        value={reply}
                        onChange={(e) => editValue(e, setReply)}
                    />
                    <Selector
                        reason={reason}
                        setReason={setReason}
                        reasons={reasons}
                    />
                </Box>

                {send && (
                    <Typography
                        color="success"
                        level="title-lg"
                        variant="soft"
                        startDecorator={<CheckCircle size={16} weight="bold" />}
                        sx={{
                            borderRadius: '50px',
                            px: 2,
                            py: 1.4,
                            marginInline: '0',
                            fontSize: '16px',
                            justifyContent: 'center'
                        }}
                    >
                        Вопрос успешно отправлен
                    </Typography>
                )}

                {!send && (
                    <Button
                        type="submit"
                        sx={{
                            borderRadius: '50px',
                            py: 1.2,
                            width: '100%',
                            fontSize: '16px'
                        }}
                        onClick={sendQuestion}
                        loading={loading}
                        disabled={!showButton()}
                    >
                        Отправить вопрос
                    </Button>
                )}
            </LayoutSettings>
        </AppProfile>
    );
}
