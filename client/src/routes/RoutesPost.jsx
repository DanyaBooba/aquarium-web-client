import { Route } from 'react-router-dom'

import ProfileMiddleware from '../middlewares/ProfileMiddleware'
import MaybeProfileMiddleware from '../middlewares/MaybeProfileMiddleware'

import PageAddpost from '../pages/Addpost/PageAddpost'
import PageShowPost from '../pages/ShowPost/PageShowPost'
import PageShowPostEmbed from '../pages/ShowPost/PageShowPostEmbed'
import PageEditpost from '../pages/Editpost/PageEditpost'
import PageStatsPost from '../pages/Statspost/PageStatsPost'

export const RoutesPost = [
    <Route
        path="/post/:idUser/:idPost" element={<MaybeProfileMiddleware><PageShowPost /></MaybeProfileMiddleware>}
        key="route-u-post" />,
    <Route
        path="/post/:idUser/:idPost/embed" element={<PageShowPostEmbed />}
        key="route-u-post-embed" />,
    <Route path="/post/create" element={<ProfileMiddleware><PageAddpost /></ProfileMiddleware>} key="route-u-post-add" />,
    <Route path="/post/edit/:globalPostId" element={<ProfileMiddleware><PageEditpost /></ProfileMiddleware>} key="route-u-post-edit" />,
    <Route path="/post/stats/:globalPostId" element={<ProfileMiddleware><PageStatsPost /></ProfileMiddleware>} key="route-u-post-edit" />,
]
