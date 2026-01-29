import { Box, IconButton } from '@mui/joy';
import { CaretLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import ChatDisplayUser from './ChatHeader/ChatDisplayUser';
import ChatDisplayMoreMenu from './ChatHeader/ChatDisplayMoreMenu';

function ChatHeader({ user = {}, currentUserId = 0 }) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1,
                px: .5,
                borderBottom: '1px solid var(--joy-palette-divider)',
                flexShrink: 0,
            }}
        >
            <IconButton
                onClick={() => navigate('/messages', { state: { direction: -1 } })}
                sx={{
                    borderRadius: '50px',
                }}
            >
                <CaretLeft size={20} />
            </IconButton>
            <ChatDisplayUser
                id={user?.id ?? 0}
                avatar={user?.avatar ?? ''}
                firstName={user?.firstName ?? ''}
                lastName={user?.lastName}
                bookmark={user?.bookmark ?? false}
            />

            <Box sx={{
                display: 'flex',
                gap: 1,
                ml: 'auto',
                alignItems: 'center'
            }}>
                <ChatDisplayMoreMenu
                    userId={user?.id}
                    bookmark={user?.bookmark ?? false}
                />
            </Box>
        </Box>
    )
}

export default ChatHeader;
