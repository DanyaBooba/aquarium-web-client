import { useState, useEffect } from 'react'
import { BookmarkSimple, PencilSimple, Flag, Trash, DotsThreeVertical, ChartBar } from '@phosphor-icons/react';
import { Dropdown, Menu, MenuButton, MenuItem, Divider, Box } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useDeletePost } from '../../../../hooks/post/useDeletePost';
import ModalConfirmDelete from '../../ModalConfirmDelete/ModalConfirmDelete';

const bookmarkCache = new Map();

function ButtonBookmark({ globalId }) {
    const [bookmark, setBookmark] = useState(false);

    const handleBookmark = async (e) => {
        e.stopPropagation();

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return;

            const res = await fetch(`https://mini.aquarium.org.ru/api/post/bookmark/${globalId}`, {
                method: bookmark ? 'DELETE' : 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            const nextValue = data?.bookmark ?? false;

            setBookmark(nextValue);
            bookmarkCache.set(globalId, nextValue);
        } catch (err) {
            console.error('Ошибка при изменении закладки:', err);
        }
    };

    useEffect(() => {
        if (bookmarkCache.has(globalId)) {
            setBookmark(bookmarkCache.get(globalId));
            return;
        }

        const fetchBookmarkStatus = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) return;

                const res = await fetch(`https://mini.aquarium.org.ru/api/post/bookmark/${globalId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) throw new Error();

                const data = await res.json();
                const value = data?.bookmark ?? false;

                setBookmark(value);
                bookmarkCache.set(globalId, value);
            } catch (err) {
                console.error('Ошибка при загрузке закладки', err);
            }
        };

        fetchBookmarkStatus();
    }, [globalId]);

    return (
        <MenuItem onClick={handleBookmark} sx={{ py: 1 }}>
            <BookmarkSimple size={20} weight={bookmark ? 'fill' : 'regular'} />
            {bookmark ? 'Избранное' : 'В избранное'}
        </MenuItem>
    );
}

function ButtonReport() {
    const handleReport = (e) => {
        e.stopPropagation();
    }

    return (
        <MenuItem onClick={handleReport} color="danger" sx={{ py: 1 }}>
            <Flag size={20} />
            Пожаловаться
        </MenuItem>
    )
}

function ButtonDelete({ onClick = () => { } }) {
    const handlerClickDelete = (e) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <>
            <MenuItem onClick={(e) => handlerClickDelete(e)} color="danger" sx={{ py: 1 }}>
                <Trash size={20} />
                Удалить
            </MenuItem>
        </>
    )
}

function ButtonStats({ globalId }) {
    const navigate = useNavigate();

    const handleStatsPost = (e) => {
        e.stopPropagation();
        navigate(`/post/stats/${globalId}`);
    }

    return (
        <MenuItem onClick={handleStatsPost} sx={{ py: 1 }}>
            <ChartBar size={20} />
            Статистика
        </MenuItem>
    )
}

function ButtonEdit({ globalId }) {
    const navigate = useNavigate();

    const handleEditPost = (e) => {
        e.stopPropagation();
        navigate(`/post/edit/${globalId}`);
    }

    return (
        <MenuItem onClick={handleEditPost} sx={{ py: 1 }}>
            <PencilSimple size={20} />
            Редактировать
        </MenuItem>
    )
}

function MoreMenu({ globalId = 0, myPost = false, posAbsolute = true }) {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleDeletePost = useDeletePost();

    const handleButtonClick = (e) => {
        e.stopPropagation();
    };

    const sxPosition = {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 100,
    }

    return (
        <>
            <Dropdown>
                <MenuButton
                    onClick={handleButtonClick}
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
                                    outline: '2px solid #8884ff',
                                    outlineOffset: '2px',
                                },
                                width: 36,
                                height: 36,

                                ...(posAbsolute && sxPosition),
                            },
                        },
                    }}
                >
                    <DotsThreeVertical size={20} />
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    variant="plain"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        borderRadius: '12px'
                    }}
                >
                    <ButtonBookmark globalId={globalId} />
                    {myPost && <ButtonEdit globalId={globalId} />}
                    {myPost && <ButtonStats globalId={globalId} />}

                    <Divider sx={{ my: 0.5 }} />
                    {!myPost && <ButtonReport />}
                    {myPost && <ButtonDelete onClick={() => setOpenModalDelete(true)} />}
                </Menu>
            </Dropdown>
            <ModalConfirmDelete
                open={openModalDelete}
                setOpen={setOpenModalDelete}
                onDelete={() => handleDeletePost(globalId)}
                desc="Вы действительно хотите удалить запись? Это действие необратимо."
            />
        </>
    );
}

export default MoreMenu;
