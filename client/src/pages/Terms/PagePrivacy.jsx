import { Container, Typography, Box, Divider, Link as JoyLink } from '@mui/joy';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function PagePrivacy() {
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
                Политика конфиденциальности
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
                    Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сервиса «Аквариум» (далее — «Сервис»), расположенного по адресу&nbsp;
                    <JoyLink href="https://aquarium.org.ru" target="_blank">https://aquarium.org.ru</JoyLink>.
                </Typography>

                <Typography level="title-lg" sx={{ mb: 2 }}>1. Оператор персональных данных</Typography>
                <Typography sx={{ mb: 4 }}>
                    Оператором персональных данных является физическое лицо Дыбка Даниил.
                    Контактный адрес: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>.
                    Обработка персональных данных осуществляется в соответствии с законодательством Российской Федерации.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>2. Персональные данные, которые мы обрабатываем</Typography>
                <Typography sx={{ mb: 2 }}>При использовании Сервиса мы собираем и обрабатываем следующие категории данных:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Имя или никнейм;</Typography></li>
                    <li><Typography>Адрес электронной почты;</Typography></li>
                    <li><Typography>Аватар пользователя;</Typography></li>
                    <li><Typography>IP-адрес;</Typography></li>
                    <li><Typography>Данные об устройстве, браузере и операционной системе;</Typography></li>
                    <li><Typography>Дата и время посещений;</Typography></li>
                    <li><Typography>Содержимое сообщений и звонков, передаваемых через Сервис (хранится в зашифрованном виде);</Typography></li>
                    <li><Typography>Метаданные коммуникаций: сведения об участниках переписки и звонков, времени и факте их передачи.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>3. Цели обработки персональных данных</Typography>
                <Typography sx={{ mb: 2 }}>Данные обрабатываются в следующих целях:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Авторизация и идентификация пользователей;</Typography></li>
                    <li><Typography>Обеспечение работы функций мессенджера: доставка сообщений, организация звонков;</Typography></li>
                    <li><Typography>Улучшение качества Сервиса и работы технической поддержки;</Typography></li>
                    <li><Typography>Обеспечение безопасности и предотвращение мошеннических действий;</Typography></li>
                    <li><Typography>Сбор обезличенной статистики посещений с помощью Яндекс Метрики;</Typography></li>
                    <li><Typography>Исполнение требований законодательства Российской Федерации в части хранения данных о коммуникациях.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>4. Основание для обработки</Typography>
                <Typography sx={{ mb: 4 }}>
                    Обработка персональных данных осуществляется на основании явного согласия пользователя, выраженного путём установки соответствующей отметки при регистрации в Сервисе, а также на основании требований законодательства Российской Федерации — в части данных, хранение которых обязательно по закону.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>5. Защита данных</Typography>
                <Typography sx={{ mb: 4 }}>
                    Все персональные данные хранятся на серверах, расположенных на территории Российской Федерации. Содержимое сообщений и звонков хранится в зашифрованном виде. Мы применяем технические и организационные меры для защиты данных от несанкционированного доступа, изменения или уничтожения.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>6. Передача данных третьим лицам</Typography>
                <Typography sx={{ mb: 4 }}>
                    Мы не передаём персональные данные пользователей третьим лицам в коммерческих целях. Обезличенные данные об использовании Сервиса обрабатываются Яндекс Метрикой в соответствии с политикой конфиденциальности Яндекса. Данные могут быть предоставлены уполномоченным государственным органам по их законному запросу в соответствии с законодательством Российской Федерации.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>7. Сроки хранения данных</Typography>
                <Typography sx={{ mb: 2 }}>Сроки хранения зависят от типа данных:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '16px' }}>
                    <li><Typography>Данные аккаунта (имя, email, аватар) — до момента удаления аккаунта пользователем;</Typography></li>
                    <li><Typography>Метаданные коммуникаций (кто, кому, когда) — 1 год с момента передачи, в соответствии с требованиями законодательства;</Typography></li>
                    <li><Typography>Содержимое сообщений и звонков — 6 месяцев с момента передачи, в соответствии с требованиями законодательства.</Typography></li>
                </ul>
                <Typography sx={{ mb: 4 }}>
                    После удаления аккаунта данные, хранение которых обязательно по закону, продолжают храниться в течение установленных сроков, после чего уничтожаются.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>8. Права пользователя</Typography>
                <Typography sx={{ mb: 2 }}>В соответствии с законодательством вы имеете право:</Typography>
                <ul style={{ paddingLeft: '28px', marginBottom: '28px' }}>
                    <li><Typography>Получить информацию об обработке ваших персональных данных;</Typography></li>
                    <li><Typography>Потребовать уточнения или исправления недостоверных данных;</Typography></li>
                    <li><Typography>Отозвать согласие на обработку данных и удалить аккаунт — данные, не подпадающие под требования закона, будут удалены.</Typography></li>
                </ul>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>9. Возрастные ограничения</Typography>
                <Typography sx={{ mb: 4 }}>
                    Сервис предназначен для пользователей в возрасте 14 лет и старше. Пользователи в возрасте от 14 до 18 лет вправе использовать Сервис самостоятельно в соответствии с гражданским законодательством Российской Федерации.
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>10. Удаление аккаунта и данных</Typography>
                <Typography sx={{ mb: 3 }}>
                    Вы можете удалить свой аккаунт и все связанные данные, перейдя по ссылке:
                </Typography>
                <Typography sx={{ mb: 3, wordBreak: 'break-all' }}>
                    <JoyLink href="https://aquarium.org.ru/settings/profile/delete" target="_blank" rel="noopener noreferrer">
                        https://aquarium.org.ru/settings/profile/delete
                    </JoyLink>
                </Typography>
                <Typography sx={{ mb: 4 }}>
                    По иным вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу: <JoyLink href="mailto:daniil@dybka.ru">daniil@dybka.ru</JoyLink>
                </Typography>

                <Divider sx={{ my: 5 }} />

                <Typography level="title-lg" sx={{ mb: 2 }}>11. Изменения Политики</Typography>
                <Typography>
                    Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на данной странице. Дата последнего обновления указана в начале документа. Продолжение использования Сервиса после изменений означает принятие обновлённой Политики.
                </Typography>
            </Box>
        </Container>
    );
}

export default PagePrivacy;
