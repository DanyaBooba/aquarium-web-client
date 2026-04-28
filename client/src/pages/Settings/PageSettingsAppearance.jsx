import { useEffect, useRef, useState } from 'react';
import {
    Stack,
    Box,
    CircularProgress,
} from '@mui/joy';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import ServerError from '../../components/module/ServerError/ServerError';
import { useProfile } from '../../hooks/profile/useProfile';
import HorizontalScrollAppearanceList from './Appearance/HorizontalScrollAppearanceList';
import ImageOptionAvatar from './Appearance/Option/ImageOptionAvatar';
import ImageOptionLoadAvatar from './Appearance/Option/ImageOptionLoadAvatar';
import ImageOptionCap from './Appearance/Option/ImageOptionCap';
import ImageOptionLoadCap from './Appearance/Option/ImageOptionLoadCap';
import { apiFetch } from '../../utils/apiClient';
import { convertHeicToJpg } from '../../utils/convertHeicToJpg';

import AvatarCropModal from './Appearance/Crop/AvatarCropModal';
import CapCropModal from './Appearance/Crop/CapCropModal';

import defaultAvatars from '../../data/userImages/defaultAvatars';
import defaultCovers from '../../data/userImages/defaultCovers';

const uploadCroppedImage = async (file, url, setErrorAvatar) => {
    try {
        setErrorAvatar('');

        const formData = new FormData();
        formData.append('files', file);

        const res = await apiFetch(url, {
            method: 'PATCH',
            body: formData,
        });

        if (!res.ok) throw new Error('Ошибка при загрузки аватарки');

        const data = await res.json();

        if (data?.status) {
            return data?.image;
        }
        else {
            throw new Error('Ошибка при загрузки аватарки');
        }
    } catch (e) {
        setErrorAvatar('Ошибка при загрузки аватарки');
    }
}

const fetchGetImages = async (link, setImages, setLoading, setError) => {
    setLoading(true);

    try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return;

        const res = await apiFetch(link, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        if (!data?.status) {
            setError(data?.error);
        }
        else {
            setImages(data?.images ?? []);
        }
    } catch (err) {

    }
    finally {
        setLoading(false);
    }
}

const fetchUpdateImage = async (link, body, setError = () => { }) => {
    try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return;

        const res = await apiFetch(link, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (!res.ok) setError('Не удалось обновить');

        const data = await res.json();
        if (!data?.status) setError(data?.error);
    } catch (err) {

    }
}

function PageSettingsAppearance() {
    const { user, loading, error } = useProfile();

    // Avatar
    const [errorAvatar, setErrorAvatar] = useState('');
    const [defaultAvatar, setDefaultAvatar] = useState('');
    const [loadedAvatars, setLoadedAvatars] = useState([]);
    const [loadingAvatars, setLoadingAvatars] = useState(false);

    const [cropAvatarOpen, setCropAvatarOpen] = useState(false);
    const [selectedAvatarImage, setSelectedAvatarImage] = useState(null);
    const fileInputAvatarRef = useRef(null);

    useEffect(() => {
        fetchGetImages(
            '/api/profile/avatars',
            setLoadedAvatars,
            setLoadingAvatars,
            setErrorAvatar
        );
    }, []);

    useEffect(() => {
        setDefaultAvatar(user?.avatar ?? '');
    }, [user, loading, error]);

    const handleClickAvatar = (avatar) => {
        fetchUpdateImage(
            '/api/profile/avatar',
            JSON.stringify({ avatar: avatar }),
            setErrorAvatar
        );

        setDefaultAvatar(avatar);
    }

    const onClickLoadImageAvatar = () => {
        fileInputAvatarRef.current?.click()
    }

    const onSaveLoadImageAvatar = async (croppedFile) => {
        setCropAvatarOpen(false);
        setSelectedAvatarImage(null);

        const data = await uploadCroppedImage(croppedFile, '/api/profile/avatar/upload', setErrorAvatar);

        if (data) {
            setDefaultAvatar(data);
            setLoadedAvatars(prev => [data, ...prev]);
        }
    };

    // Cap
    const [errorCap, setErrorCap] = useState('');
    const [defaultCap, setDefaultCap] = useState('');
    const [loadedCaps, setLoadedCaps] = useState([]);
    const [loadingCaps, setLoadingCaps] = useState(false);

    const [cropCapOpen, setCropCapOpen] = useState(false);
    const [selectedCapImage, setSelectedCapImage] = useState(null);
    const fileInputCapRef = useRef(null);

    useEffect(() => {
        fetchGetImages(
            '/api/profile/caps',
            setLoadedCaps,
            setLoadingCaps,
            setErrorCap
        );
    }, []);

    useEffect(() => {
        setDefaultCap(user?.cap ?? '');
    }, [user, loading, error]);

    const handleClickCover = (cover) => {
        fetchUpdateImage(
            '/api/profile/cap',
            JSON.stringify({ cap: cover }),
            setErrorCap
        );

        setDefaultCap(cover);
    }

    const onClickLoadImageCap = () => {
        fileInputCapRef.current?.click()
    }

    const onSaveLoadImageCap = async (croppedFile) => {
        setCropCapOpen(false);
        setSelectedCapImage(null);

        const data = await uploadCroppedImage(croppedFile, '/api/profile/cap/upload', setErrorCap);

        if (data) {
            setDefaultCap(data);
            setLoadedCaps(prev => [data, ...prev]);
        }
    };

    return (
        <AppProfile title="Настройки персонализации" desc="Настройки персонализации в социальной сети Аквариум">
            <LayoutSettings header="Персонализация">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <ServerError />
                ) : user ? (
                    <Stack spacing={4} mt={2}>
                        {loadingAvatars ? (
                            <CircularProgress />
                        ) : (
                            <HorizontalScrollAppearanceList
                                title="Аватар"
                                size="256x256"
                                error={errorAvatar}

                                ViewImage={ImageOptionAvatar}
                                ViewImageLoad={ImageOptionLoadAvatar}

                                images={[...loadedAvatars, ...defaultAvatars]}
                                defaultImage={defaultAvatar}

                                onClickImage={handleClickAvatar}
                                onClickImageLoad={onClickLoadImageAvatar}
                            />
                        )}

                        <input
                            ref={fileInputAvatarRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={async (e) => {
                                let file = e.target.files?.[0]
                                if (!file) return

                                if (file.type === 'image/heic' || file.type === 'image/heif') {
                                    file = await convertHeicToJpg(file)
                                }

                                const url = URL.createObjectURL(file)

                                setSelectedAvatarImage(url)
                                setCropAvatarOpen(true)

                                e.target.value = ''
                            }}
                        />

                        <AvatarCropModal
                            open={cropAvatarOpen}
                            image={selectedAvatarImage}
                            onClose={() => {
                                setCropAvatarOpen(false)
                                setSelectedAvatarImage(null)
                            }}
                            onSave={onSaveLoadImageAvatar}
                        />

                        {loadingCaps ? (
                            <CircularProgress />
                        ) : (
                            <HorizontalScrollAppearanceList
                                title="Шапка"
                                size="1280x720"
                                error={errorCap}

                                ViewImage={ImageOptionCap}
                                ViewImageLoad={ImageOptionLoadCap}

                                images={[...loadedCaps, ...defaultCovers]}
                                defaultImage={defaultCap}

                                onClickImage={handleClickCover}
                                onClickImageLoad={onClickLoadImageCap}
                            />
                        )}

                        <input
                            ref={fileInputCapRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={async (e) => {
                                let file = e.target.files?.[0]
                                if (!file) return

                                if (file.type === 'image/heic' || file.type === 'image/heif') {
                                    file = await convertHeicToJpg(file)
                                }

                                const url = URL.createObjectURL(file)

                                setSelectedCapImage(url)
                                setCropCapOpen(true)

                                e.target.value = ''
                            }}
                        />

                        <CapCropModal
                            open={cropCapOpen}
                            image={selectedCapImage}
                            onClose={() => {
                                setCropCapOpen(false)
                                setSelectedCapImage(null)
                            }}
                            onSave={onSaveLoadImageCap}
                        />
                    </Stack>
                ) : null}
            </LayoutSettings>
        </AppProfile>
    );
}

export default PageSettingsAppearance;
