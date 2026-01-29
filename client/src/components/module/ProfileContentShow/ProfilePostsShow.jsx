import { useState, useMemo } from 'react'
import { Typography, Box, Stack, Dropdown, MenuButton, Menu, MenuItem } from '@mui/joy'
import { CaretDown } from '@phosphor-icons/react'
import Post from '../Post/Post'
import { NotFound } from '../ServerError/ServerError'

function ProfilePostsShow({ posts, side = false, tab }) {
    const SORT_MY_OPTIONS = [
        { label: 'Все записи', value: 'all' },
        { label: 'Опубликованные', value: 'published' },
        { label: 'На модерации', value: 'moderate' },
        { label: 'Черновики', value: 'draft' }
    ]

    const SORT_OPTIONS = [
        { label: 'Сначала новые', value: 'newest' },
        { label: 'Сначала старые', value: 'oldest' },
        { label: 'По лайкам', value: 'likes' },
        { label: 'По просмотрам', value: 'views' },
        { label: 'По комментариям', value: 'comments' },
    ]

    const [sortType, setSortType] = useState('newest')
    const [sortMyType, setSortMyType] = useState('all');

    const sortedPosts = useMemo(() => {
        let filteredPosts = [...posts]

        if (tab === 'posts') {
            switch (sortMyType) {
                case 'published':
                    filteredPosts = filteredPosts.filter(p => p.status > 0)
                    break
                case 'moderate':
                    filteredPosts = filteredPosts.filter(p => p.status === -1)
                    break
                case 'draft':
                    filteredPosts = filteredPosts.filter(p => p.status === 0)
                    break
                default:
                    break
            }
        }

        const SORT_FUNCTIONS = {
            newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
            oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            likes: (a, b) => (b.countLikes || 0) - (a.countLikes || 0),
            views: (a, b) => (b.countViews || 0) - (a.countViews || 0),
            comments: (a, b) => (b.countComments || 0) - (a.countComments || 0),
            activity: (a, b) => ((b.countLikes || 0) + (b.countComments || 0)) - ((a.countLikes || 0) + (a.countComments || 0)),
        }

        return filteredPosts.sort(SORT_FUNCTIONS[sortType] || SORT_FUNCTIONS.newest)
    }, [posts, sortType, sortMyType])

    return (
        <Box mt={2}>
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px' }} id="posts">
                {side && (
                    <Typography level="title-md" mr="auto">
                        Записи
                    </Typography>
                )}
                {!side && tab === 'posts' && (
                    <Box sx={{ mr: 'auto' }}>
                        <Dropdown>
                            <MenuButton
                                slots={{ root: Typography }}
                                slotProps={{
                                    root: {
                                        level: 'body-xs',
                                        endDecorator: <CaretDown size={14} />,
                                        sx: {
                                            display: 'flex',
                                            marginLeft: 'auto',
                                            cursor: 'pointer',
                                            width: 'fit-content',
                                            justifyContent: 'end',
                                        },
                                    },
                                }}
                            >
                                {SORT_MY_OPTIONS.find(opt => opt.value === sortMyType)?.label}
                            </MenuButton>
                            <Menu placement="bottom-end" sx={{ border: 'none', borderRadius: '12px' }}>
                                {SORT_MY_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        selected={option.value === sortMyType}
                                        onClick={() => setSortMyType(option.value)}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Dropdown>
                    </Box>
                )}
                <Dropdown>
                    <MenuButton
                        slots={{ root: Typography }}
                        slotProps={{
                            root: {
                                level: 'body-xs',
                                endDecorator: <CaretDown size={14} />,
                                sx: {
                                    display: 'flex',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                                    width: 'fit-content',
                                    justifyContent: 'end',
                                },
                            },
                        }}
                    >
                        {SORT_OPTIONS.find(opt => opt.value === sortType)?.label}
                    </MenuButton>
                    <Menu placement="bottom-end" sx={{ border: 'none', borderRadius: '12px' }}>
                        {SORT_OPTIONS.map((option) => (
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
            {sortedPosts.length > 0 ? (
                <Stack spacing={2}>
                    {sortedPosts.map(post => (
                        <Post post={post} key={post.id} />
                    ))}
                </Stack>
            ) : (
                <NotFound />
            )}
        </Box>
    )
}

export default ProfilePostsShow
