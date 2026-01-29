import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, IconButton, Button, CircularProgress } from '@mui/joy';
import { Heart, ChatCircle, Eye, Calendar, PencilSimple, Info, Hash, Globe, BookmarkSimple, X, Copy, Check } from '@phosphor-icons/react';
import { AppProfile } from '../../components/app/App';
import FormatDateFull from '../../components/module/FormatDateFull/FormatDateFull';
import { useParams, useNavigate } from 'react-router-dom';
import IconCalendar from './IconCalendar'
import ServerError from '../../components/module/ServerError/ServerError';

const commonButtonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '6px',
    cursor: 'pointer',
    color: 'neutral.600',
    '&:hover': {
        backgroundColor: 'neutral.softHoverBg',
    },
    '&:focus-visible': {
        outline: '2px solid #8884ff',
        outlineOffset: '2px',
    },
    width: 36,
    height: 36,
};

function StatItem({ icon: Icon = null, iconBlock = null, label, value, mb = 1, valueColor = null }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: mb }}>
            {Icon && <Icon size={18} />}
            {iconBlock}
            <Typography level="body-sm" sx={{ flexGrow: 1 }}>{label}</Typography>
            <Typography level="body-sm" fontWeight="lg" sx={{ wordBreak: 'break-all' }} color={valueColor}>{value}</Typography>
        </Box>
    );
}

function Title() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography level="h4">Статистика</Typography>
            <IconButton
                size="sm"
                variant="plain"
                sx={commonButtonSx}
                onClick={handleClose}
                aria-label="Закрыть"
            >
                <X size={20} />
            </IconButton>
        </Box>
    )
}

function MainActivity({ likes = 0, comments = 0, views = 0 }) {
    return (
        <>
            <Typography level="title-lg" mb={1}>Общая активность</Typography>
            <Card variant="plain" sx={{ mb: 3 }}>
                <CardContent>
                    <StatItem icon={Heart} label="Лайков" value={likes} />
                    <StatItem icon={ChatCircle} label="Комментариев" value={comments} />
                    <StatItem icon={Eye} label="Просмотров" value={views} mb={0} />
                </CardContent>
            </Card>
        </>
    )
}

function StatusAndTheme({ status = 0, theme = null }) {
    const convertStatus = (status) => {
        switch (status) {
            case -2:
                return 'Публикация отклонена'
            case -1:
                return 'На модерации'
            case 0:
                return 'Черновик'
            case 1:
                return 'Опубликовано'
            default:
                return 'Неизвестный'
        }
    }

    const colorStatus = (status) => {
        switch (Number(status)) {
            case 1:
                return 'success';
            case -1:
                return 'primary';
            case -2:
                return 'danger';
            default:
                return null;
        }
    };

    const convertTheme = (theme) => {
        switch (theme) {
            default:
                return '—'
        }
    }

    return (
        <>
            <Typography level="title-lg" mb={1}>Статус и тема</Typography>
            <Card variant="plain" sx={{ mb: 3 }}>
                <CardContent>
                    <StatItem icon={BookmarkSimple} label="Статус" value={convertStatus(status)} valueColor={colorStatus(status)} />
                    <StatItem icon={Hash} label="Тематика" value={convertTheme(theme)} mb={0} />
                </CardContent>
            </Card>
        </>
    )
}

function Timestamp({ timeCreate, timeEdit = null }) {
    return (
        <>
            <Typography level="title-lg" mb={1}>Временные метки</Typography>
            <Card variant="plain" sx={{ mb: 3 }}>
                <CardContent>
                    <StatItem iconBlock={<Calendar size={18} />} label="Создано" value={<FormatDateFull dateString={timeCreate ?? null} />} />
                    <StatItem icon={PencilSimple} label="Изменено" value={
                        timeEdit ? <FormatDateFull dateString={timeEdit ?? null} /> : '—'
                    } mb={0} />
                </CardContent>
            </Card>
        </>
    )
}

function TechInfo({ postLink, localId = 0, globalId = 0 }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}${postLink}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000)
    };

    return (
        <>
            <Typography level="title-lg" mb={1}>Техническое</Typography>
            <Card variant="plain" sx={{ mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography level="body-sm" fontWeight="lg" sx={{ wordBreak: 'break-all' }}>
                            {`${window.location.origin}${postLink}`}
                        </Typography>
                        <IconButton size="sm" variant="plain" onClick={handleCopy}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
            <Card variant="plain" sx={{ mb: 3 }}>
                <CardContent>
                    <StatItem icon={Info} label="Локальный ID" value={localId} />
                    <StatItem icon={Globe} label="Глобальный ID" value={globalId} mb={0} />
                </CardContent>
            </Card>
        </>
    )
}

function HelpButtons({ postLink, postEditLink }) {
    const navigate = useNavigate();

    const handleOpenPost = () => {
        navigate(postLink);
    };

    const handleEditPost = () => {
        navigate(postEditLink);
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                <Button
                    onClick={handleOpenPost}
                    variant="solid"
                    color="primary"
                    sx={{
                        flex: 1,
                        borderRadius: '50px',
                        width: '100%',
                        minWidth: '150px'
                    }}
                >
                    Открыть запись
                </Button>
                <Button
                    onClick={handleEditPost}
                    variant="outlined"
                    color="primary"
                    sx={{
                        flex: 1,
                        borderRadius: '50px',
                        width: '100%',
                        minWidth: '150px'
                    }}
                >
                    Редактировать
                </Button>
            </Box>
        </>
    )
}

export default function PagePostStatsMock() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { globalPostId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                const accessToken = localStorage.getItem('accessToken')

                const res = await fetch(`https://mini.aquarium.org.ru/api/post?id=${globalPostId}`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                const data = await res.json()

                setPost(data?.post)
            } catch (err) {
                setError('Ошибка при загрузке поста')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [globalPostId])

    const postLink = !loading && `/post/${post?.idUser}/${post?.idPost}`
    const postEditLink = !loading && `/post/edit/${post?.id}`

    return (
        <AppProfile title="Статистика записи" desc="Детали активности вашей записи">
            <Title />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : post ? (
                <>
                    <MainActivity
                        likes={post?.countLikes}
                        comments={post?.countComments}
                        views={post?.countViews}
                    />
                    <Timestamp
                        timeCreate={post?.created_at}
                        timeEdit={post?.expired_at}
                    />
                    <StatusAndTheme
                        status={post?.status}
                        theme={post?.theme}
                    />
                    <TechInfo
                        postLink={postLink}
                        localId={post?.idPost}
                        globalId={post?.id}
                    />
                    <HelpButtons
                        postLink={postLink}
                        postEditLink={postEditLink}
                    />
                </>
            ) : null}
        </AppProfile>
    );
}
