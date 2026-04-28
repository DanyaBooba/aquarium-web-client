import { Container, Typography, Box, Divider, Link as JoyLink } from '@mui/joy';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function PageTermsOfService() {
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
                Условия использования
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
                    Настоящие Условия использования (далее — «Условия») регулируют порядок доступа и использования сервиса «Аквариум» (далее — «Сервис»), расположенного по адресу&nbsp;
                    <JoyLink href="https://aquarium.org.ru" target="_blank">https://aquarium.org.ru</JoyLink>. Используя Сервис, вы подтверждаете, что ознакомились с настоящими Условиями и принимаете их в полном объёме.
                </Typography>

                <Typography level="title-lg" sx={{ mb: 2 }}>1. Общая информация</Typography>
                <Typography sx={{ mb: 4 }}>
                    Владелец Сервиса — физическое лицо, Дыбка Даниил Викторович.<br />
                    Контакт для связи: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>2. Возрастные ограничения</Typography>
                <Typography sx={{ mb: 4 }}>
                    Сервис предназначен для пользователей в возрасте от 14 лет. Лица в возрасте от 14 до 18 лет вправе использовать Сервис только с согласия родителей или иных законных представителей. Регистрируясь, вы подтверждаете, что соответствуете указанному возрастному требованию.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>3. Описание Сервиса</Typography>
                <Typography sx={{ mb: 4 }}>
                    «Аквариум» — бесплатный мессенджер, предоставляющий пользователям возможность обмениваться текстовыми сообщениями и совершать видеозвонки. Сервис предоставляется на условиях «как есть» без каких-либо гарантий бесперебойной работы.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>4. Правила использования</Typography>
                <Typography sx={{ mb: 2 }}>
                    Пользователям запрещено:
                </Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>распространять спам и массовые нежелательные сообщения;</Typography></li>
                    <li><Typography>размещать контент, нарушающий законодательство Российской Федерации, в том числе пропаганду насилия, экстремизма, материалы сексуального насилия над детьми;</Typography></li>
                    <li><Typography>осуществлять действия, направленные на нарушение работы Сервиса, его взлом или дестабилизацию;</Typography></li>
                    <li><Typography>выдавать себя за других лиц или вводить пользователей в заблуждение;</Typography></li>
                    <li><Typography>использовать Сервис в целях мошенничества, вымогательства или иных незаконных действий.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>5. Администрирование и модерация</Typography>
                <Typography sx={{ mb: 4 }}>
                    Администратором Сервиса является Дыбка Даниил Викторович. Администратор вправе без предварительного уведомления удалять или ограничивать доступ к контенту, нарушающему настоящие Условия или законодательство Российской Федерации.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>6. Блокировка и удаление аккаунтов</Typography>
                <Typography sx={{ mb: 4 }}>
                    Администратор оставляет за собой право ограничивать доступ к Сервису или удалять аккаунты пользователей, нарушающих настоящие Условия. Если вы считаете, что блокировка была применена ошибочно, вы можете обратиться к администратору по адресу <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink> с описанием ситуации. Администратор рассматривает обращения в разумные сроки.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>7. Ответственность пользователя</Typography>
                <Typography sx={{ mb: 4 }}>
                    Пользователь несёт полную ответственность за контент, который он размещает и передаёт через Сервис, а также за соблюдение действующего законодательства Российской Федерации при использовании Сервиса.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>8. Отказ от ответственности</Typography>
                <Typography sx={{ mb: 4 }}>
                    Администратор не несёт ответственности за содержание пользовательского контента, а также за убытки или ущерб, возникшие в результате использования Сервиса или временной недоступности Сервиса. Сервис предоставляется бесплатно и без гарантий.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>9. Применимое право</Typography>
                <Typography sx={{ mb: 4 }}>
                    Настоящие Условия регулируются законодательством Российской Федерации. Все споры, возникающие в связи с использованием Сервиса, разрешаются в соответствии с законодательством РФ.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>10. Изменения Условий</Typography>
                <Typography>
                    Администратор вправе в одностороннем порядке изменять настоящие Условия. Актуальная версия всегда доступна на данной странице. Дата последнего обновления указана в начале документа. Продолжение использования Сервиса после внесения изменений означает принятие обновлённых Условий.
                </Typography>
            </Box>
        </Container>
    );
}

export default PageTermsOfService;
