import { Container, Typography, Box, Divider, Link as JoyLink } from '@mui/joy';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function PageCookies() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <Link to="/legal" style={{ textDecoration: 'none' }}>
                <Typography
                    startDecorator={<ArrowLeft size={20} />}
                    level="body-md"
                    sx={{ mb: 4, display: 'inline-flex', alignItems: 'center', gap: .5, '&:hover': { color: 'primary.plainColor' } }}
                >
                    Назад к списку документов
                </Typography>
            </Link>

            <Typography level="h1" sx={{ mb: 1 }}>
                Политика использования cookie
            </Typography>
            <Typography sx={{ mb: 5, color: 'text.tertiary' }}>
                Последнее обновление: март 2026 г.
            </Typography>

            <Box sx={{
                bgcolor: 'background.surface',
                p: { xs: 3, md: 6 },
                borderRadius: '24px',
                lineHeight: 1.85,
                wordBreak: 'break-word'
            }}>
                <Typography sx={{ mb: 4 }}>
                    Настоящая Политика использования cookie (далее — «Политика») описывает, какие файлы cookie и аналогичные технологии используются на сайте сервиса «Аквариум», расположенного по адресу&nbsp;
                    <JoyLink href="https://aquarium.org.ru" target="_blank">https://aquarium.org.ru</JoyLink>, и в каких целях.
                </Typography>

                <Typography level="title-lg" sx={{ mb: 2 }}>1. Что такое cookie</Typography>
                <Typography sx={{ mb: 4 }}>
                    Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они позволяют сайту запоминать информацию о вашем визите и обеспечивать корректную работу сервиса.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>2. Какие cookie мы используем</Typography>
                <Typography sx={{ mb: 2 }}>
                    Мы используем следующие типы cookie:
                </Typography>
                <Typography component="div" sx={{ mb: 2 }}>
                    <strong>Необходимые cookie (наши собственные)</strong><br />
                    Используются для хранения токена авторизации, необходимого для входа в аккаунт. Без этих файлов использование сервиса невозможно. Срок хранения — 7 дней с момента входа в систему.
                </Typography>
                <Typography component="div" sx={{ mb: 4 }}>
                    <strong>Cookie третьих лиц</strong><br />
                    Сервис использует Яндекс Метрику для сбора обезличенной статистики посещений. Яндекс Метрика устанавливает собственные cookie для анализа поведения пользователей на сайте. Обработка этих данных регулируется политикой конфиденциальности Яндекса: <JoyLink href="https://yandex.ru/legal/confidential" target="_blank">yandex.ru/legal/confidential</JoyLink>. Мы не контролируем и не несём ответственности за обработку данных третьими лицами.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>3. Цели использования cookie</Typography>
                <Typography sx={{ mb: 4 }}>
                    Cookie используются исключительно для обеспечения работы авторизации и корректного функционирования сервиса. Мы не используем cookie в рекламных целях и не передаём их содержимое третьим лицам, за исключением случаев, описанных в разделе 2.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>4. Управление cookie</Typography>
                <Typography sx={{ mb: 4 }}>
                    Вы можете управлять cookie через настройки вашего браузера: отключить их, удалить уже сохранённые или настроить уведомления об установке новых. Обратите внимание, что отключение необходимых cookie сделает вход в аккаунт невозможным. Инструкции для популярных браузеров: <JoyLink href="https://support.google.com/chrome/answer/95647" target="_blank">Chrome</JoyLink>, <JoyLink href="https://support.mozilla.org/ru/kb/udalenie-kukov-vyklyuchenie-kukov" target="_blank">Firefox</JoyLink>, <JoyLink href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac" target="_blank">Safari</JoyLink>.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>5. Соответствие законодательству</Typography>
                <Typography sx={{ mb: 4 }}>
                    Использование cookie осуществляется в соответствии с законодательством Российской Федерации в области персональных данных и информации. Мы обеспечиваем защиту информации, получаемой с помощью cookie.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>6. Изменения политики</Typography>
                <Typography sx={{ mb: 4 }}>
                    Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на данной странице. Дата последнего обновления указана в начале документа. Продолжение использования сервиса после изменений означает ваше согласие с обновлённой Политикой.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>7. Контакты</Typography>
                <Typography>
                    По вопросам, связанным с использованием cookie, вы можете обратиться к нам по электронной почте: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>
                </Typography>
            </Box>
        </Container>
    );
}

export default PageCookies;
