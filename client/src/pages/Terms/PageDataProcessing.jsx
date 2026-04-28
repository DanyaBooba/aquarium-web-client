import { Container, Typography, Box, Divider, Link as JoyLink } from '@mui/joy';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function PageDataProcessing() {
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
                Согласие на обработку персональных данных
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
                    Настоящее Согласие на обработку персональных данных (далее — «Согласие») описывает, какие персональные данные собирает сервис «Аквариум» (далее — «Сервис»), расположенный по адресу&nbsp;
                    <JoyLink href="https://aquarium.org.ru" target="_blank">https://aquarium.org.ru</JoyLink>, в каких целях и на каких условиях они обрабатываются.
                </Typography>

                <Typography level="title-lg" sx={{ mb: 2 }}>1. Оператор персональных данных</Typography>
                <Typography sx={{ mb: 4 }}>
                    Оператором персональных данных является физическое лицо Дыбка Даниил, контактный адрес электронной почты: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>2. Персональные данные, которые мы обрабатываем</Typography>
                <Typography sx={{ mb: 2 }}>При использовании Сервиса мы обрабатываем следующие категории данных:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Имя или никнейм;</Typography></li>
                    <li><Typography>Адрес электронной почты;</Typography></li>
                    <li><Typography>IP-адрес;</Typography></li>
                    <li><Typography>Данные об устройстве и браузере (тип устройства, операционная система, браузер);</Typography></li>
                    <li><Typography>Содержимое сообщений и звонков, передаваемых через Сервис;</Typography></li>
                    <li><Typography>Метаданные коммуникаций: сведения об участниках переписки и звонков, времени и факте передачи сообщений.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>3. Цели обработки данных</Typography>
                <Typography sx={{ mb: 2 }}>Ваши данные обрабатываются в следующих целях:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Обеспечение работы Сервиса: идентификация пользователя, авторизация, доставка сообщений и обеспечение звонков;</Typography></li>
                    <li><Typography>Анализ использования Сервиса в обезличенном виде с помощью Яндекс Метрики для улучшения качества работы;</Typography></li>
                    <li><Typography>Исполнение требований законодательства Российской Федерации, в том числе в части хранения данных о коммуникациях.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>4. Основание для обработки</Typography>
                <Typography sx={{ mb: 4 }}>
                    Обработка персональных данных осуществляется на основании вашего явного согласия,
                    выраженного путём установки соответствующей отметки при регистрации в Сервисе,
                    а также на основании требований законодательства Российской Федерации — в части данных,
                    хранение которых является обязательным по закону вне зависимости от наличия согласия.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>5. Передача данных третьим лицам</Typography>
                <Typography sx={{ mb: 4 }}>
                    Мы не передаём ваши персональные данные третьим лицам в коммерческих целях. Обезличенные данные об использовании Сервиса обрабатываются Яндекс Метрикой в соответствии с политикой конфиденциальности Яндекса. Данные могут быть предоставлены уполномоченным государственным органам по их законному запросу в соответствии с законодательством Российской Федерации.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>6. Защита и хранение данных</Typography>
                <Typography sx={{ mb: 4 }}>
                    Все данные хранятся на серверах, расположенных на территории Российской Федерации, и защищены с использованием современных методов шифрования.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>7. Сроки хранения данных</Typography>
                <Typography sx={{ mb: 2 }}>Сроки хранения зависят от типа данных:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '16px' }}>
                    <li><Typography>Данные аккаунта (имя, email) — до момента удаления аккаунта пользователем;</Typography></li>
                    <li><Typography>Метаданные коммуникаций (кто, кому, когда) — 1 год с момента передачи, в соответствии с требованиями законодательства;</Typography></li>
                    <li><Typography>Содержимое сообщений и звонков — 6 месяцев с момента передачи, в соответствии с требованиями законодательства.</Typography></li>
                </ul>
                <Typography sx={{ mb: 4 }}>
                    После удаления аккаунта данные, хранение которых обязательно по закону, продолжают храниться в течение установленных сроков, после чего уничтожаются.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>8. Права пользователя</Typography>
                <Typography sx={{ mb: 2 }}>Вы имеете право:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Получить информацию об обработке ваших персональных данных;</Typography></li>
                    <li><Typography>Потребовать уточнения или исправления ваших данных;</Typography></li>
                    <li><Typography>Отозвать согласие и удалить аккаунт — данные, не подпадающие под требования закона, будут удалены.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>9. Отзыв согласия и удаление данных</Typography>
                <Typography sx={{ mb: 3 }}>
                    Вы можете отозвать согласие и удалить аккаунт со всеми связанными данными по ссылке:
                </Typography>
                <Typography sx={{ mb: 4, wordBreak: 'break-all' }}>
                    <JoyLink href="https://aquarium.org.ru/settings/profile/delete" target="_blank" rel="noopener noreferrer">
                        https://aquarium.org.ru/settings/profile/delete
                    </JoyLink>
                </Typography>
                <Typography sx={{ mb: 4 }}>
                    По вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>10. Изменения Согласия</Typography>
                <Typography>
                    Мы можем обновлять настоящее Согласие. Актуальная версия всегда доступна на данной странице. Дата последнего обновления указана в начале документа. Продолжение использования Сервиса после изменений означает принятие обновлённых условий.
                </Typography>
            </Box>
        </Container>
    );
}

export default PageDataProcessing;
