import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { DotsThreeVertical, PencilSimple, UserPlus, Trash, Image, ImageSquare, UsersThree } from "@phosphor-icons/react";
import { useState } from "react";
import ModalRenameGroup from "../GroupModals/ModalRenameGroup";
import ModalAddMembers from "../GroupModals/ModalAddMembers";
import ModalDeleteGroup from "../GroupModals/ModalDeleteGroup";
import ModalGroupChatImage from "../GroupModals/ModalGroupChatImage";
import { apiFetch } from '../../../../utils/apiClient';

export default function ChatDisplayGroupMoreMenu({ chatId, chatName, chatImage, groupMembers = [], onRenamed, onMembersUpdated, onImageUpdated, isAdmin = false, setMembersOpen }) {
    const [renameOpen, setRenameOpen] = useState(false);
    const [addMembersOpen, setAddMembersOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);

    const handleRemoveImage = async () => {
        try {
            await apiFetch(`/api/chats/group/${chatId}/image`, { method: 'DELETE' });
            onImageUpdated(null);
        } catch {
            // silent
        }
    };

    return (
        <>
            <Box sx={{ ml: 'auto' }}>
                <Dropdown>
                    <MenuButton
                        slots={{ root: Box }}
                        slotProps={{
                            root: {
                                role: 'button',
                                tabIndex: 0,
                                sx: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    padding: '6px',
                                    cursor: 'pointer',
                                    color: 'neutral.600',
                                    '&:hover': { backgroundColor: 'neutral.softHoverBg' },
                                    width: 36,
                                    height: 36,
                                },
                            },
                        }}
                    >
                        <DotsThreeVertical size={20} />
                    </MenuButton>
                    <Menu placement="bottom-end" variant="plain" sx={{ borderRadius: '12px' }}>
                        {isAdmin && (
                            <MenuItem onClick={() => setRenameOpen(true)} sx={{ py: 1 }}>
                                <PencilSimple size={20} />
                                Изменить название
                            </MenuItem>
                        )}
                        {isAdmin && (
                            <MenuItem onClick={() => setImageOpen(true)} sx={{ py: 1 }}>
                                <Image size={20} />
                                Загрузить фото
                            </MenuItem>
                        )}
                        {chatImage && isAdmin && (
                            <MenuItem onClick={handleRemoveImage} sx={{ py: 1 }}>
                                <ImageSquare size={20} />
                                Убрать фото
                            </MenuItem>
                        )}
                        <MenuItem onClick={() => setMembersOpen(true)} sx={{ py: 1 }}>
                            <UsersThree size={20} />
                            Список участников
                        </MenuItem>
                        {isAdmin && (
                            <MenuItem onClick={() => setAddMembersOpen(true)} sx={{ py: 1 }}>
                                <UserPlus size={20} />
                                Добавить участников
                            </MenuItem>
                        )}
                        {isAdmin && (
                            <MenuItem onClick={() => setDeleteOpen(true)} color="danger" sx={{ py: 1 }}>
                                <Trash size={20} />
                                Удалить группу
                            </MenuItem>
                        )}
                    </Menu>
                </Dropdown>
            </Box>

            <ModalRenameGroup
                open={renameOpen}
                onClose={() => setRenameOpen(false)}
                chatId={chatId}
                currentName={chatName}
                onRenamed={onRenamed}
            />

            <ModalGroupChatImage
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                chatId={chatId}
                currentImage={chatImage}
                onImageUpdated={onImageUpdated}
            />

            <ModalAddMembers
                open={addMembersOpen}
                onClose={() => setAddMembersOpen(false)}
                chatId={chatId}
                groupMembers={groupMembers}
                onMembersUpdated={onMembersUpdated}
            />

            <ModalDeleteGroup
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                chatId={chatId}
            />
        </>
    );
}
