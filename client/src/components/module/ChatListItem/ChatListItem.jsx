import { Avatar, Typography, Box, Sheet } from '@mui/joy';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { messageCheckStatus } from '../../../utils/messageCheckStatus';
import { BookmarkSimple } from '@phosphor-icons/react';

function ShowAvatar({ avatar, firstName, lastName, bookmark }) {
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
            src={!bookmark ? avatar : '...'}
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
    isOnline = false,
    onClick,
    countChats = 0,
    firstBlock = false,
    lastBlock = false,
    checkStatus = 0
}) {
    const filterUnread = (unread) => {
        const value = Math.max(0, unread);
        return value > 99 ? '99+' : value;
    }

    const borderRadiusCheck = () => {
        if (countChats === 1) {
            return {
                borderRadius: '12px'
            }
        }

        if (firstBlock) {
            return {
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
            }
        }

        if (lastBlock) {
            return {
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
            }
        }

        return {
            borderRadius: '4px'
        }
    }

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
                />
            </Badge>

            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography level="title-md" noWrap>
                    {bookmark ? (
                        'Избранное'
                    ) : (
                        <>
                            {user?.firstName}{' '}{user?.lastName}
                        </>
                    )}
                </Typography>
                <Typography level="body-sm" color="neutral" noWrap>
                    {lastMessage.length > 0 ? lastMessage : <>&nbsp;</>}
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
                            backgroundColor: 'primary.500',
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
