import { useState, useEffect } from 'react';
import { usePosts } from '../../../hooks/post/usePosts';

import ProfileTabs from './ProfileTabs';
import ProfilePostsShow from './ProfilePostsShow';
// import ProfileAchivs from './ProfileAchivs';
import ProfileInfo from './ProfileInfo';
import ProfileButtons from './ProfileButtons';
import ProfileAvatar from './ProfileAvatar';

import PostsSkeleton from '../PostsSkeleton/PostsSkeleton';
import ServerError, { NotFound } from '../ServerError/ServerError';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { CaretLeft } from '@phosphor-icons/react';

function ProfileContentShow({ user, side = false }) {
    const navigate = useNavigate();

    const [tab, setTab] = useState(localStorage.getItem('profileTabs') ?? 'posts');
    const [initialPostCount, setInitialPostCount] = useState(null);

    const postsData = usePosts({ idUser: user.id, side, category: 'posts' });
    const likesData = usePosts({ idUser: user.id, side, category: 'likes' });
    const favoritesData = usePosts({ idUser: user.id, side, category: 'bookmarks' });

    const handlerChangeTab = (tab) => {
        tab = ['posts', 'likes', 'bookmarks'].includes(tab) ? tab : 'posts'
        localStorage.setItem('profileTabs', tab)
        setTab(tab)
    }

    const tabMap = {
        posts: postsData,
        likes: likesData,
        bookmarks: favoritesData,
    };

    const currentTabData = tabMap[tab] ?? {};
    const { posts = [], error = null, loading = false } = currentTabData;

    useEffect(() => {
        setInitialPostCount(user?.countPosts);
    }, [user]);

    const getCountFromJson = (json) =>
        Array.isArray(json) ? json.length : 0;

    return (
        <>
            {user?.itsme && side && (
                <Button
                    onClick={() => navigate(-1)}
                    startDecorator={<CaretLeft size={18} weight='bold' />}
                    size="sm"
                    variant="plain"
                    sx={{
                        borderRadius: "50px",
                        mb: 1,
                    }}
                >
                    Вернуться
                </Button>
            )}

            <ProfileAvatar
                avatar={user?.avatar ?? null}
                cap={user?.cap ?? null}
                firstName={user?.firstName ?? null}
                lastName={user?.lastName ?? null}
                verified={user?.verified}
                description={user?.description ?? null}
                userId={user?.itsme ? null : (user?.id ?? null)}
                username={user?.username ?? null}
            />

            <ProfileButtons
                username={user?.username ?? null}
                id={user?.id ?? 0}
                side={side}
                itsme={user?.itsme ?? false}
            />

            <ProfileInfo
                countSubs={getCountFromJson(user?.jsonSubs)}
                countSub={getCountFromJson(user?.jsonSub)}
                countPosts={initialPostCount ?? 0}
                userId={user?.id}
                setTab={handlerChangeTab}
            />

            {!side && <ProfileTabs tab={tab} setTab={handlerChangeTab} />}

            {loading ? (
                <PostsSkeleton count={3} />
            ) : error ? (
                <ServerError />
            ) : Array.isArray(posts) && posts.length > 0 ? (
                <ProfilePostsShow posts={posts} side={side} tab={tab} />
            ) : (
                <NotFound
                    buttonShow={!side && tab === 'posts'}
                    buttonName="Создать запись"
                    buttonLink="/post/create"
                />
            )}
        </>
    );
}

export default ProfileContentShow;
