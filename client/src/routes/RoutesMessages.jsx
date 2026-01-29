import { Route } from 'react-router-dom'

import ProfileMiddleware from '../middlewares/ProfileMiddleware'

import PageMessages from '../pages/PageMessages/PageMessages'
import PageChat from '../pages/PageChat/PageChat'

export const RoutesMessages = [
    <Route path="/messages" element={<ProfileMiddleware><PageMessages /></ProfileMiddleware>} key="route-u-messages" />,
    <Route path="/chat/:id" element={<ProfileMiddleware><PageChat /></ProfileMiddleware>} key="route-u-chat" />,
]
