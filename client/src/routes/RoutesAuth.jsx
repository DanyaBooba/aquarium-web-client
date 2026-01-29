import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import GuestMiddleware from '../middlewares/GuestMiddleware'

import PageSignIn from '../pages/Auth/PageSignIn'

export const RoutesAuth = [
    <Route index element={<Navigate to="/feed" replace />} key="route-redirect-main" />,
    <Route path="/auth" element={<GuestMiddleware><PageSignIn /></GuestMiddleware>} key="route-auth" />,
]
