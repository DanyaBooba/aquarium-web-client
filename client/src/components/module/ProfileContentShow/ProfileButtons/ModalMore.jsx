import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../../hooks/auth/useLogout";
import { Divider, Dropdown } from "@mui/joy";
import { Menu, MenuButton, MenuItem } from "@mui/joy";
import { CaretDown, Eye, Flag, ShareNetwork, SignOut, UserCheck, UserPlus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ModalConfirmDelete from "../../ModalConfirmDelete/ModalConfirmDelete";
import { apiFetch } from '../../../../utils/apiClient';

function ModalMoreFollow({ id = 0, disabled, follow = false, setFollow = () => { } }) {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFollowToggle = async () => {
        try {
            setLoading(true);

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) navigate('/auth');

            const method = follow ? "DELETE" : "POST";
            const res = await apiFetch(`/api/user/follow/${id}`, {
                method,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!res.ok) throw new Error("Ошибка при изменении подписки");

            const data = await res.json();
            setFollow(data?.follow ?? false);
        } catch (err) {
            console.error("Ошибка при подписке/отписке:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MenuItem
            onClick={handleFollowToggle}
            sx={{ py: 1 }}
            loading={loading}
            disabled={disabled}
        >
            {follow && (
                <>
                    <UserCheck size={20} style={{ marginRight: 4 }} />
                    Подписан
                </>
            )}
            {!follow && (
                <>
                    <UserPlus size={20} style={{ marginRight: 4 }} />
                    Подписаться
                </>
            )}
        </MenuItem>
    );
}

export function ModalMore({ setShareOpen, side = false, id = 0, itsme = true }) {
    const navigate = useNavigate();
    const handleLogout = useLogout();

    const [follow, setFollow] = useState(false);
    const [openModalExit, setOpenModalExit] = useState(false);

    const handlerClickExit = () => setOpenModalExit(true);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            if (itsme) return;

            try {
                const accessToken = localStorage.getItem('accessToken')
                if (!accessToken) return;

                const res = await apiFetch(`/api/user/follow/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!res.ok) throw new Error("Не удалось определить статус подписки");

                const data = await res.json();
                setFollow(data?.follow ?? false);
            } catch (err) {
                console.error("Ошибка при проверке подписки");
            }
        };

        if (!itsme) fetchFollowStatus();
    }, [id, itsme]);

    return (
        <Dropdown>
            <MenuButton
                startDecorator={<CaretDown size={20} />}
                variant="plain"
                color="primary"
                sx={(theme) => ({
                    px: 2,
                    py: 1,
                    borderRadius: "50px",
                    color: theme.palette.mode === 'dark'
                        ? theme.palette.primary[100]
                        : null,
                })}
            >
                Еще
            </MenuButton>
            <Menu variant="plain" sx={{ borderRadius: '12px' }}>
                {side && (
                    <>
                        <ModalMoreFollow id={id} disabled={itsme} follow={follow} setFollow={setFollow} />
                        <MenuItem onClick={() => setShareOpen(true)} sx={{ py: 1 }}>
                            <ShareNetwork size={20} style={{ marginRight: 4 }} />
                            Поделиться
                        </MenuItem>
                        {/* <Divider sx={{ my: 0.5 }} />
                        <MenuItem
                            color="danger"
                            sx={{ py: 1 }}
                            disabled={itsme}
                        >
                            <Flag size={20} style={{ marginRight: 4 }} />
                            Пожаловаться
                        </MenuItem> */}
                    </>
                )}

                {!side && (
                    <>
                        <MenuItem onClick={() => navigate(`/show/id/${id}`)} sx={{ py: 1 }}>
                            <Eye size={20} style={{ marginRight: 4 }} />
                            Вид со стороны
                        </MenuItem>
                        <MenuItem onClick={() => setShareOpen(true)} sx={{ py: 1 }}>
                            <ShareNetwork size={20} style={{ marginRight: 4 }} />
                            Поделиться
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem color="danger" onClick={handlerClickExit} sx={{ py: 1 }}>
                            <SignOut size={20} style={{ marginRight: 4 }} />
                            Выйти
                        </MenuItem>
                    </>
                )}
            </Menu>
            <ModalConfirmDelete
                open={openModalExit}
                setOpen={setOpenModalExit}
                onDelete={handleLogout}
                title="Подтвердите выход"
                desc="Вы действительно хотите выйти из аккаунта?"
                buttonActiveText="Выйти"
            />
        </Dropdown>
    )
}
