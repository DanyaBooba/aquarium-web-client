import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { DotsThreeVertical, Trash } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../../../../utils/apiClient";
import ModalConfirmDelete from "../../ModalConfirmDelete/ModalConfirmDelete";

const handlerDeleteChat = async (userId = 0) => {
    try {
        const res = await apiFetch(`/api/messages/${userId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error("Не удалось удалить сообщения");

        const data = await res.json();

        return data?.success;
    } catch (err) {
        console.error("Не удалось удалить сообщения");
    }
}

export default function ChatDisplayMoreMenu({ userId = 0, bookmark = false }) {
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);

    const deleteMessages = async () => {
        const success = await handlerDeleteChat(userId);
        setOpenConfirm(false);
        if (success) {
            navigate('/messages');
        }
    }

    return (
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
                                '&:hover': {
                                    backgroundColor: 'neutral.softHoverBg',
                                },
                                '&:focus-visible': {
                                    outlineOffset: '2px',
                                },
                                width: 36,
                                height: 36,
                            },
                        },
                    }}
                >
                    <DotsThreeVertical size={20} />
                </MenuButton>
                <Menu placement="bottom-end" variant="plain" sx={{ borderRadius: '12px' }}>
                    {/* {!bookmark && (
                        <MenuItem onClick={() => { }} color="danger" sx={{ py: 1 }}>
                            <Prohibit size={20} />
                            Заблокировать
                        </MenuItem>
                    )} */}
                    <MenuItem onClick={() => setOpenConfirm(true)} color="danger" sx={{ py: 1 }}>
                        <Trash size={20} />
                        Удалить чат
                    </MenuItem>
                </Menu>
            </Dropdown>

            <ModalConfirmDelete
                open={openConfirm}
                setOpen={setOpenConfirm}
                onDelete={deleteMessages}
                title="Удалить чат?"
                desc="Все сообщения будут удалены безвозвратно."
                buttonActiveText="Удалить"
            />
        </Box>
    );
}
