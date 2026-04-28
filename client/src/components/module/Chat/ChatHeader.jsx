import { Avatar, Box, IconButton, Typography } from '@mui/joy';
import { CaretLeft, UsersThree } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatDisplayUser from './ChatHeader/ChatDisplayUser';
import ChatDisplayMoreMenu from './ChatHeader/ChatDisplayMoreMenu';
import ChatDisplayPhone from './ChatHeader/ChatDisplayPhone';
import ChatDisplayGroupMoreMenu from './ChatHeader/ChatDisplayGroupMoreMenu';
import ModalGroupMembers from './GroupModals/ModalGroupMembers';

function GroupChatHeader({ groupName, groupImage, memberCount }) {
    const groupImageURL = () => {
        if (!groupImage) return null;
        return groupImage.startsWith('http') ? groupImage : `${process.env.REACT_APP_API_URL}${groupImage}`;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
            {groupImage ? (
                <Avatar src={groupImageURL()} alt={groupName} size="sm" sx={{ flexShrink: 0 }} />
            ) : (
                <Box sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary[500],
                    flexShrink: 0,
                })}>
                    <UsersThree size={18} color="white" weight="fill" />
                </Box>
            )}
            <Box sx={{ minWidth: 0 }}>
                <Typography level="title-md" noWrap>
                    {groupName || 'Групповой чат'}
                </Typography>
                {memberCount > 0 && (
                    <Typography level="body-xs" color="neutral">
                        {memberCount} {memberCount === 1 ? 'участник' : memberCount < 5 ? 'участника' : 'участников'}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

function ChatHeader({
    user = {},
    currentUserId = 0,
    isGroup = false,
    groupName: initialGroupName = '',
    groupImage = '',
    groupMembers = [],
    chatId = null,
    isPartnerTyping = false,
}) {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState(initialGroupName);
    const [members, setMembers] = useState(groupMembers);
    const [currentGroupImage, setCurrentGroupImage] = useState(groupImage);
    const [membersOpen, setMembersOpen] = useState(false);

    const isAdmin = isGroup && members.some(
        m => Number(m.userId) === Number(currentUserId) && m.userType === 100
    );

    const handleRenamed = (newName) => setGroupName(newName);
    const handleMembersUpdated = (updatedMembers) => setMembers(updatedMembers);
    const handleImageUpdated = (newImage) => setCurrentGroupImage(newImage);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1,
                px: .5,
                gap: 1,
                borderBottom: '1px solid var(--joy-palette-divider)',
                flexShrink: 0,
            }}
        >
            <IconButton
                onClick={() => navigate('/messages', { state: { direction: -1 } })}
                sx={{ borderRadius: '50px', flexShrink: 0 }}
            >
                <CaretLeft size={20} />
            </IconButton>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                {isGroup ? (
                    <GroupChatHeader
                        groupName={groupName}
                        groupImage={currentGroupImage}
                        memberCount={members.length}
                    />
                ) : (
                    <ChatDisplayUser
                        id={user?.id ?? 0}
                        avatar={user?.avatar ?? ''}
                        firstName={user?.firstName ?? ''}
                        lastName={user?.lastName}
                        verified={user?.verified}
                        bookmark={user?.bookmark ?? false}
                        isTyping={isPartnerTyping}
                    />
                )}
            </Box>

            {isGroup && (
                <Box sx={{ flexShrink: 0 }}>
                    <ChatDisplayGroupMoreMenu
                        chatId={chatId}
                        chatName={groupName}
                        chatImage={currentGroupImage}
                        groupMembers={members}
                        onRenamed={handleRenamed}
                        onMembersUpdated={handleMembersUpdated}
                        onImageUpdated={handleImageUpdated}
                        isAdmin={isAdmin}
                        setMembersOpen={setMembersOpen}
                    />
                </Box>
            )}

            {!isGroup && (
                <Box sx={{ display: 'flex', gap: 1, ml: 'auto', alignItems: 'center', flexShrink: 0 }}>
                    <ChatDisplayPhone
                        bookmark={user?.bookmark ?? false}
                        userToChat={user}
                        currentUserId={currentUserId}
                    />
                    <ChatDisplayMoreMenu
                        userId={user?.id}
                        bookmark={user?.bookmark ?? false}
                    />
                </Box>
            )}

            {isGroup && (
                <ModalGroupMembers
                    open={membersOpen}
                    onClose={() => setMembersOpen(false)}
                    chatId={chatId}
                    currentUserId={currentUserId}
                    onMembersUpdated={handleMembersUpdated}
                />
            )}
        </Box>
    );
}

export default ChatHeader;
