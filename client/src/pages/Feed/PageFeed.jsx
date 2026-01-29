import { useState, useMemo } from 'react';
import { AppProfile } from '../../components/app/App'
import { Typography, Stack, Box, Dropdown, MenuButton, Menu, MenuItem } from '@mui/joy';
import { CaretDown } from '@phosphor-icons/react';
import Post from '../../components/module/Post/Post';
import { usePosts } from '../../hooks/post/usePosts';
import { useScrollRestoration } from '../../hooks/service/useScrollRestoration';
import { useAuth } from '../../hooks/auth/useAuth';

import PostsSkeleton from '../../components/module/PostsSkeleton/PostsSkeleton';
import ServerError, { NotFound } from '../../components/module/ServerError/ServerError';

function FeedTitle({ showFeedLabel, feedLabel, selectFeed }) {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return (
            <Typography
                level="h4"
                mr="auto"
            >
                Лента
            </Typography>
        )
    }

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: Typography }}
                slotProps={{
                    root: {
                        level: 'h4',
                        endDecorator: <CaretDown size={18} />,
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            mr: 'auto',
                        },
                    },
                }}
            >
                {showFeedLabel()}
            </MenuButton>
            <Menu
                placement="bottom-start"
                sx={{ borderRadius: '12px', border: 'none', minWidth: 150 }}
            >
                <MenuItem
                    selected={feedLabel === 'feed'}
                    onClick={() => selectFeed('feed')}
                >
                    Лента
                </MenuItem>
                <MenuItem
                    selected={feedLabel === 'subs'}
                    onClick={() => selectFeed('subs')}
                >
                    Подписки
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

function PageFeed() {
    const { isAuth } = useAuth();

    const [feedLabel, setFeedLabel] = useState(isAuth ? localStorage.getItem('feed') ?? 'feed' : 'feed');
    const [sortType, setSortType] = useState('newest');

    const { posts, loading, error } = usePosts({ feed: feedLabel });

    useScrollRestoration('page-feed', [loading]);

    const showFeedLabel = () => {
        switch (feedLabel) {
            case 'subs':
                return 'Подписки'
            default:
                return 'Лента'
        }
    }

    const selectFeed = (label) => {
        label = ['feed', 'subs'].includes(label) ? label : 'feed'
        localStorage.setItem('feed', label)
        setFeedLabel(label)
    }

    const SORT_OPTIONS = [
        { label: 'Сначала новые', value: 'newest' },
        { label: 'Сначала старые', value: 'oldest' },
        { label: 'По лайкам', value: 'likes' },
        { label: 'По просмотрам', value: 'views' },
        { label: 'По комментариям', value: 'comments' },
    ];

    const sortedPosts = useMemo(() => {
        const postsCopy = [...(posts || [])];

        switch (sortType) {
            case 'oldest':
                return postsCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case 'likes':
                return postsCopy.sort((a, b) => (b.countLikes || 0) - (a.countLikes || 0));
            case 'views':
                return postsCopy.sort((a, b) => (b.countViews || 0) - (a.countViews || 0));
            case 'comments':
                return postsCopy.sort((a, b) => (b.countComments || 0) - (a.countComments || 0));
            case 'newest':
            default:
                return postsCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    }, [posts, sortType]);

    return (
        <AppProfile
            title="Публикации пользователей"
            desc="Посмотрите на последние публикации пользователей в социальной сети Аквариум мини"
        >
            <Box
                my={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <FeedTitle
                    showFeedLabel={showFeedLabel}
                    feedLabel={feedLabel}
                    selectFeed={selectFeed}
                />

                <Dropdown>
                    <MenuButton
                        slots={{ root: Typography }}
                        slotProps={{
                            root: {
                                level: 'body-sm',
                                endDecorator: <CaretDown size={16} />,
                                sx: { cursor: 'pointer' },
                            },
                        }}
                    >
                        {SORT_OPTIONS.find(opt => opt.value === sortType)?.label}
                    </MenuButton>
                    <Menu placement="bottom-end" sx={{ border: 'none', borderRadius: '12px' }}>
                        {SORT_OPTIONS.map(option => (
                            <MenuItem
                                key={option.value}
                                selected={option.value === sortType}
                                onClick={() => setSortType(option.value)}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Dropdown>
            </Box>

            {loading ? (
                <PostsSkeleton count={5} />
            ) : error ? (
                <ServerError />
            ) : Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <Stack spacing={2}>
                    {sortedPosts.map(post => (
                        <Post post={post} key={post.id} />
                    ))}
                </Stack>
            ) : (
                <NotFound />
            )}
        </AppProfile>
    );
}

export default PageFeed
