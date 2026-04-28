import { Avatar, Typography, Box, Sheet } from '@mui/joy';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { messageCheckStatus } from '../../../utils/messageCheckStatus';
import { BookmarkSimple, UsersThree } from '@phosphor-icons/react';
import { useIsOnline } from '../../app/OnlineProvider';
import VerifiedBadge from '../../ui/VerifiedBadge';

function ShowAvatar({ avatar, firstName, lastName, bookmark, isGroup, chatImage }) {
    const chatImageURL = () => {
        if (!chatImage) return null;
        return chatImage.startsWith('http') ? chatImage : `${process.env.REACT_APP_API_URL}${chatImage}`;
    }

    if (isGroup) {
        return chatImage ? (
            <Avatar src={chatImageURL()} alt={firstName} />
        ) : (
            <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary[500],
            })}>
                <UsersThree size={20} color="white" weight="fill" />
            </Box>
        );
    }

    if (bookmark) {
        return (
            <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.colors.logo,
                '& svg': {
                    fill: theme.colors.logoText
                }
            })}>
                <BookmarkSimple weight="fill" size={20} />
            </Box>
        )
    }

    return (
        <Avatar
            src={!bookmark ? (avatar?.includes('http') ? avatar : `${process.env.REACT_APP_API_URL}${avatar}`) : '...'}
            alt={`${firstName} ${lastName}`}
        />
    )
}

function ChatListItem({
    user,
    bookmark = false,
    lastMessage,
    time,
    unread = 0,
    onClick,
    countChats = 0,
    firstBlock = false,
    lastBlock = false,
    checkStatus = 0,
    isGroup = false,
    chatName = '',
    chatImage = '',
}) {
    const isOnline = useIsOnline(!isGroup && !bookmark ? user?.id : null);

    const filterUnread = (unread) => {
        const value = Math.max(0, unread);
        return value > 99 ? '99+' : value;
    }

    const borderRadiusCheck = () => {
        if (countChats === 1) {
            return {
                borderRadius: '24px'
            }
        }

        if (firstBlock) {
            return {
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
            }
        }

        if (lastBlock) {
            return {
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
            }
        }

        return {
            borderRadius: '8px'
        }
    }

    const getLastMessagePreview = (msg) => {
        if (!msg || msg.length === 0) return <>&nbsp;</>;

        const emojiOnly = /^[\p{Emoji}\s]+$/u;
        if (emojiOnly.test(msg.trim())) {
            return msg.trim();
        }

        if (msg.length > 45) {
            return msg.slice(0, 42) + '...';
        }
        return msg;
    };

    return (
        <Sheet
            variant="plain"
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1.5,
                gap: 1.5,
                cursor: 'pointer',
                ...borderRadiusCheck(),
                mb: .5,
                '&:hover': {
                    backgroundColor: 'neutral.softHoverBg',
                    borderBottomColor: 'neutral.softHoverBg',
                },
                '&:hover .chat__avatar .MuiBadge-badge::after': {
                    borderColor: 'neutral.softHoverBg',
                    transform: 'translate(-2px, -2px) !important',
                }
            }}
        >
            <Badge
                invisible={!isOnline}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeInset="14%"
                color="success"
                className="chat__avatar"
                sx={{
                    [`& .${badgeClasses.badge}`]: {
                        '&::after': {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: 'background.surface',
                            boxSizing: 'content-box',
                            transform: 'translate(-2px, -2px) !important',
                            content: '""',
                        },
                    },
                }}
            >
                <ShowAvatar
                    avatar={user?.avatar ?? null}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    bookmark={bookmark}
                    isGroup={isGroup}
                    chatImage={chatImage}
                />
            </Badge>

            <Box sx={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                    <Typography level="title-md" noWrap sx={{ minWidth: 0 }}>
                        {isGroup ? chatName : bookmark ? 'Избранное' : `${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
                    </Typography>
                    {!isGroup && !bookmark && !!user?.verified && <VerifiedBadge size={15} />}
                </Box>
                <Typography level="body-sm" color="neutral" noWrap>
                    {getLastMessagePreview(lastMessage)}
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <Typography
                    level="body-xs"
                    color="neutral"
                    endDecorator={messageCheckStatus(checkStatus)}
                >
                    {time}
                </Typography>
                {unread > 0 && (
                    <Box
                        sx={{
                            backgroundColor: 'danger.500',
                            color: 'white',
                            borderRadius: '999px',
                            width: 'fit-content',
                            fontSize: 12,
                            px: '5.5px',
                            mt: 0.5,
                            ml: 'auto'
                        }}
                    >
                        {filterUnread(unread)}
                    </Box>
                )}
            </Box>
        </Sheet >
    );
}

export default ChatListItem;
