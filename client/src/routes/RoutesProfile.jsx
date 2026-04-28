import { Route } from 'react-router-dom'

import ProfileMiddleware from '../middlewares/ProfileMiddleware'
import MaybeProfileMiddleware from '../middlewares/MaybeProfileMiddleware'

import PageProfile from '../pages/Profile/PageProfile'
import PageSearch from '../pages/Search/PageSearch'
import PageFeed from '../pages/Feed/PageFeed'
import PageNotifications from '../pages/Notifications/PageNotifications'
// import PageAchivs from '../pages/Achivs/PageAchivs'
import PageShowUser from '../pages/ShowUser/PageShowUser'
import PageExit from '../pages/Exit/PageExit'

export const RoutesProfile = [
    <Route path="/profile" element={<ProfileMiddleware><PageProfile /></ProfileMiddleware>} key="route-u-profile" />,
    <Route
        path="/show/id/:id"
        element={<MaybeProfileMiddleware><PageShowUser format="id" side={true} /></MaybeProfileMiddleware>}
        key="route-u-show-profile-id" />,
    <Route
        path="/show/:username"
        element={<MaybeProfileMiddleware><PageShowUser format="username" side={true} /></MaybeProfileMiddleware>}
        key="route-u-show-profile-username" />,
    <Route path="/search" element={<MaybeProfileMiddleware><PageSearch /></MaybeProfileMiddleware>} key="route-u-search" />,
    <Route path="/feed" element={<MaybeProfileMiddleware><PageFeed /></MaybeProfileMiddleware>} key="route-u-feed" />,
    <Route path="/notifications" element={<ProfileMiddleware><PageNotifications /></ProfileMiddleware>} key="route-u-notifications" />,
    // <Route path="/achievements/:idUser" element={<ProfileMiddleware><PageAchivs /></ProfileMiddleware>} key="route-u-achievements" />,
    <Route path="/exit" element={<PageExit />} key="route-u-exit" />,
]
