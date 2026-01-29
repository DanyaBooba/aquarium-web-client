import { Box, Button, IconButton, Modal, ModalDialog, Typography } from "@mui/joy"
import { X } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function ModalCookie() {
    return (
        <>
            <Typography sx={{ mb: 1 }}>Последнее обновление: 4 августа 2025 г.</Typography>
            <Typography sx={{ mb: 2 }}>
                Настоящая Политика использования cookie (далее — «Политика») регулирует порядок использования cookie-файлов пользователями сервиса «Аквариум Мини» (далее — «Сервис»), расположенного по адресу&nbsp;
                <Link href="https://mini.aquarium.org.ru" target="_blank" rel="noopener noreferrer">
                    https://mini.aquarium.org.ru
                </Link>.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>1. Что такое cookie</Typography>
            <Typography sx={{ mb: 2 }}>
                Cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении веб-сайта и используются для улучшения работы сервиса.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>2. Какие cookie мы используем</Typography>
            <Typography sx={{ mb: 2 }}>
                Мы используем только сессионные cookie, которые необходимы для корректной работы сервиса и хранения информации о сессии пользователя.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>3. Срок хранения cookie</Typography>
            <Typography sx={{ mb: 2 }}>
                Сессионные cookie хранятся в течение 7 дней с момента установки.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>4. Использование cookie</Typography>
            <Typography sx={{ mb: 2 }}>
                Cookie используются исключительно для обеспечения корректного функционирования сервиса и не собирают личные данные пользователя.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>5. Соответствие законодательству</Typography>
            <Typography sx={{ mb: 2 }}>
                Использование cookie осуществляется в соответствии с Федеральным законом Российской Федерации от 27.07.2006 № 152-ФЗ «О персональных данных». Мы обеспечиваем защиту и конфиденциальность информации, полученной с помощью cookie.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>6. Изменения политики</Typography>
            <Typography sx={{ mb: 2 }}>
                Мы можем обновлять настоящую Политику использования cookie. Рекомендуем периодически проверять данный документ на предмет изменений.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>7. Контакты</Typography>
            <Typography sx={{ mb: 1 }}>
                По вопросам, связанным с использованием cookie, вы можете связаться с нами по электронной почте: <Link href="mailto:daniil@dybka.ru">daniil@dybka.ru</Link>
            </Typography>
        </>
    )
}

function ModalData() {
    return (
        <>
            <Typography sx={{ mb: 1 }}>Последнее обновление: 4 августа 2025 г.</Typography>
            <Typography sx={{ mb: 2 }}>
                Настоящее Согласие на обработку персональных данных (далее — «Согласие») регулирует порядок сбора, использования и защиты ваших персональных данных при использовании сервиса «Аквариум Мини» (далее — «Сервис»), расположенного по адресу&nbsp;
                <Link href="https://mini.aquarium.org.ru" target="_blank" rel="noopener noreferrer">
                    https://mini.aquarium.org.ru
                </Link>.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>1. Персональные данные, которые мы обрабатываем</Typography>
            <Typography sx={{ mb: 1 }}>
                Мы обрабатываем следующие категории персональных данных:
            </Typography>
            <ul style={{ paddingLeft: '24px' }}>
                <li><Typography>Имя или никнейм;</Typography></li>
                <li><Typography>Электронная почта;</Typography></li>
                <li><Typography>IP-адрес;</Typography></li>
                <li><Typography>Данные об устройстве и браузере;</Typography></li>
            </ul>

            <Typography level="title-lg" sx={{ mb: 1 }}>2. Цели обработки данных</Typography>
            <Typography sx={{ mb: 2 }}>
                Ваши данные используются для:
            </Typography>
            <ul style={{ paddingLeft: '24px' }}>
                <li><Typography>Связи с пользователем;</Typography></li>
                <li><Typography>Аналитики;</Typography></li>
                <li><Typography>Маркетинга;</Typography></li>
                <li><Typography>Улучшения качества сервиса;</Typography></li>
            </ul>

            <Typography level="title-lg" sx={{ mb: 1 }}>3. Основание для обработки</Typography>
            <Typography sx={{ mb: 2 }}>
                Обработка осуществляется с вашего согласия, которое вы даёте, используя сервис.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>4. Защита и хранение данных</Typography>
            <Typography sx={{ mb: 2 }}>
                Все данные хранятся на серверах в Российской Федерации и защищены с помощью современных методов шифрования.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>5. Срок хранения данных</Typography>
            <Typography sx={{ mb: 2 }}>
                Данные хранятся до момента удаления аккаунта пользователем. Вы можете удалить аккаунт и персональные данные по ссылке:&nbsp;
                <Link href="https://mini.aquarium.org.ru/settings/profile/delete" target="_blank" rel="noopener noreferrer">
                    https://mini.aquarium.org.ru/settings/profile/delete
                </Link>.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>6. Отзыв согласия</Typography>
            <Typography sx={{ mb: 1 }}>
                Вы можете отозвать своё согласие, удалив аккаунт по указанной выше ссылке.
            </Typography>
        </>
    )
}

function ModalTermsOfUse() {
    return (
        <>
            <Typography sx={{ mb: 1 }}>Последнее обновление: 4 августа 2025 г.</Typography>
            <Typography sx={{ mb: 2 }}>
                Настоящие Условия использования (далее — «Условия») регулируют порядок использования пользователями сервиса «Аквариум Мини» (далее — «Сервис»), расположенного по адресу&nbsp;
                <Link href="https://mini.aquarium.org.ru" target="_blank" rel="noopener noreferrer">
                    https://mini.aquarium.org.ru
                </Link>.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>1. Общая информация</Typography>
            <Typography sx={{ mb: 2 }}>
                Владелец Сервиса — физическое лицо, Дыбка Даниил Викторович.<br />
                Контакт для связи: <Link href="mailto:daniil@dybka.ru">daniil@dybka.ru</Link>.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>2. Запрещённый контент и действия</Typography>
            <Typography sx={{ mb: 2 }}>
                Пользователям запрещено размещать и распространять:
            </Typography>
            <ul style={{ paddingLeft: '24px' }}>
                <li><Typography>спам;</Typography></li>
                <li><Typography>вредоносный или умышленно деструктивный контент, направленный на платформу;</Typography></li>
                <li><Typography>незаконный контент;</Typography></li>
                <li><Typography>иные материалы, нарушающие законодательство Российской Федерации.</Typography></li>
            </ul>

            <Typography level="title-lg" sx={{ mb: 1 }}>3. Администрирование и модерация</Typography>
            <Typography sx={{ mb: 2 }}>
                Администратором и владельцем Сервиса является Дыбка Даниил Викторович.<br />
                Администратор вправе удалять или блокировать любой контент без предварительного уведомления пользователя и объяснения причин.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>4. Ограничения и удаление аккаунтов</Typography>
            <Typography sx={{ mb: 2 }}>
                Администратор оставляет за собой право ограничивать доступ к Сервису и удалять аккаунты пользователей без объяснения причин и без предварительного уведомления.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>5. Отказ от ответственности</Typography>
            <Typography sx={{ mb: 1 }}>
                Администратор не несёт ответственности за возможные убытки или ущерб, возникшие в результате использования Сервиса, а также за содержание пользовательского контента.
            </Typography>
        </>
    )
}

function ModalPrivacyPolicy() {
    return (
        <>
            <Typography sx={{ mb: 1 }}>Последнее обновление: 4 августа 2025 г.</Typography>
            <Typography sx={{ mb: 1 }}>Адрес сайта: <Link href="https://mini.aquarium.org.ru">https://mini.aquarium.org.ru</Link></Typography>
            <Typography sx={{ mb: 2 }}>Контакт: <Link href="mailto:daniil@dybka.ru">daniil@dybka.ru</Link></Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>1. Общие положения</Typography>
            <Typography sx={{ mb: 1 }}>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса «Аквариум Мини» (далее — Сервис), размещённого по адресу https://mini.aquarium.org.ru.
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Мы соблюдаем требования Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и гарантируем сохранность предоставленных вами данных.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>2. Персональные данные, которые мы обрабатываем</Typography>
            <Typography sx={{ mb: 1 }}>При использовании Сервиса мы можем собирать и обрабатывать следующие категории персональных данных:</Typography>

            <ul style={{ paddingLeft: '24px' }}>
                <li><Typography>Имя или псевдоним (никнейм);</Typography></li>
                <li><Typography>Электронная почта;</Typography></li>
                <li><Typography>Аватар пользователя;</Typography></li>
                <li><Typography>IP-адрес;</Typography></li>
                <li><Typography>Данные об устройстве, браузере и операционной системе;</Typography></li>
                <li><Typography>Дата и время посещений;</Typography></li>
                <li><Typography>Переписка и контент, созданный пользователями (в шифрованном виде).</Typography></li>
            </ul>

            <Typography level="title-lg" sx={{ mb: 1 }}>3. Цели обработки персональных данных</Typography>
            <Typography sx={{ mb: 1 }}>Данные используются исключительно для:</Typography>

            <ul style={{ paddingLeft: '24px' }}>
                <li><Typography>авторизации и идентификации пользователей;</Typography></li>
                <li><Typography>предоставления функций мессенджера;</Typography></li>
                <li><Typography>улучшения качества сервиса и работы технической поддержки;</Typography></li>
                <li><Typography>обеспечения безопасности и предотвращения мошенничества;</Typography></li>
                <li><Typography>сбора обезличенной статистики посещений с помощью Яндекс.Метрики.</Typography></li>
            </ul>

            <Typography level="title-lg" sx={{ mb: 1 }}>4. Защита и хранение данных</Typography>
            <Typography sx={{ mb: 2 }}>
                Все персональные данные хранятся на серверах, расположенных на территории Российской Федерации.
                Сообщения и другой пользовательский контент шифруются и не доступны третьим лицам. Мы принимаем разумные технические и организационные меры для защиты информации от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>5. Передача данных третьим лицам</Typography>
            <Typography sx={{ mb: 1 }}>
                Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Для сбора статистики используется Яндекс.Метрика, которая может обрабатывать обезличенные данные в соответствии со своей политикой конфиденциальности.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>6. Возрастные ограничения</Typography>
            <Typography sx={{ mb: 2 }}>
                Сервис предназначен для пользователей старше 16 лет. Использование Сервиса лицами младше указанного возраста допускается только с согласия законных представителей.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>7. Удаление аккаунта и данных</Typography>
            <Typography sx={{ mb: 2 }}>
                Вы можете удалить свой аккаунт и все связанные с ним персональные данные, перейдя по адресу:
                <Link href="https://mini.aquarium.org.ru/settings/profile/delete">https://mini.aquarium.org.ru/settings/profile/delete</Link>
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>8. Изменения политики</Typography>
            <Typography sx={{ mb: 2 }}>
                Мы можем обновлять настоящую Политику, при этом дата последнего обновления будет указана вверху. Мы рекомендуем регулярно проверять этот документ.
            </Typography>

            <Typography level="title-lg" sx={{ mb: 1 }}>9. Контакты</Typography>
            <Typography sx={{ mb: 1 }}>
                По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами по электронной почте: <Link href="mailto:daniil@dybka.ru">daniil@dybka.ru</Link>
            </Typography>
        </>
    )
}

export default function ModalPrivacyContent({
    open,
    setOpen,
    modalText,
    setModalText
}) {
    const changeModalText = (changeText) => {
        const check = [
            'privacy',
            'terms',
            'data',
            'cookie',
        ].includes(changeText)

        setModalText(check ? changeText : 'privacy')
    }

    const titleModalText = (currentText) => {
        switch (currentText) {
            case 'terms':
                return 'Условия использования'
            case 'data':
                return 'Согласие на обработку персональных данных'
            case 'cookie':
                return 'Политика использования cookie'
            default:
                return 'Политика конфиденциальности'
        }
    }

    const activeModalText = (currentText) => {
        return modalText.toLowerCase() === currentText.toLowerCase()
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    borderRadius: '32px',
                    border: 'none',
                    p: 3,
                    boxSizing: 'border-box',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    '@media (max-width: 540px)': {
                        maxWidth: 'calc(100% - 40px)',
                    },
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    <Typography level="title-lg" sx={{ pr: 3 }}>
                        {titleModalText(modalText)}
                    </Typography>
                    <IconButton
                        aria-label="Закрыть"
                        onClick={() => setOpen(false)}
                        variant="plain"
                        color="neutral"
                        sx={{
                            borderRadius: '50px',
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        overflowY: 'auto',
                        flexGrow: 1,
                        minHeight: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            overflowX: 'auto',
                            mb: 2,
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <Button
                            size="sm"
                            variant={activeModalText('privacy') ? 'solid' : 'outlined'}
                            onClick={() => changeModalText('privacy')}
                            sx={{
                                borderRadius: '50px',
                                whiteSpace: 'nowrap',
                                px: 2,
                                minWidth: 'auto',
                                fontSize: '0.75rem',
                            }}
                        >
                            Политика конфиденциальности
                        </Button>
                        <Button
                            size="sm"
                            variant={activeModalText('terms') ? 'solid' : 'outlined'}
                            onClick={() => changeModalText('terms')}
                            sx={{
                                borderRadius: '50px',
                                whiteSpace: 'nowrap',
                                px: 2,
                                minWidth: 'auto',
                                fontSize: '0.75rem',
                            }}
                        >
                            Условия использования
                        </Button>
                        <Button
                            size="sm"
                            variant={activeModalText('data') ? 'solid' : 'outlined'}
                            onClick={() => changeModalText('data')}
                            sx={{
                                borderRadius: '50px',
                                whiteSpace: 'nowrap',
                                px: 2,
                                minWidth: 'auto',
                                fontSize: '0.75rem',
                            }}
                        >
                            Согласие на обработку персональных данных
                        </Button>
                        <Button
                            size="sm"
                            variant={activeModalText('cookie') ? 'solid' : 'outlined'}
                            onClick={() => changeModalText('cookie')}
                            sx={{
                                borderRadius: '50px',
                                whiteSpace: 'nowrap',
                                px: 2,
                                minWidth: 'auto',
                                fontSize: '0.75rem',
                            }}
                        >
                            Политика использования cookie
                        </Button>
                    </Box>
                    {modalText === 'privacy' && <ModalPrivacyPolicy />}
                    {modalText === 'terms' && <ModalTermsOfUse />}

                    {modalText === 'data' && <ModalData />}
                    {modalText === 'cookie' && <ModalCookie />}
                </Box>
            </ModalDialog>
        </Modal>
    )
}
