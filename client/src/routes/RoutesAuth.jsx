import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import PageDocuments from '../pages/Terms/PageDocuments';
import PrivacyPage from '../pages/Terms/PagePrivacy';
import TermsOfServicePage from '../pages/Terms/PageTermsOfServices';
import CookiesPage from '../pages/Terms/PageCookies';
import DataProcessingPage from '../pages/Terms/PageDataProcessing';

import GuestMiddleware from '../middlewares/GuestMiddleware'

import PageSignIn from '../pages/Auth/PageSignIn'
import PageYandexCallback from '../pages/Auth/PageYandexCallback'

export const RoutesAuth = [
    <Route index element={<Navigate to="/feed" replace />} key="route-redirect-main" />,
    <Route path="/auth" element={<GuestMiddleware><PageSignIn /></GuestMiddleware>} key="route-auth" />,
    <Route path="/auth/yandex" element={<PageYandexCallback />} key="route-auth-yandex" />,

    <Route path="/legal" element={<PageDocuments />} key="route-terms" />,
    <Route path="/legal/privacy" element={<PrivacyPage />} key="route-terms-privacy" />,
    <Route path="/legal/terms-of-service" element={<TermsOfServicePage />} key="route-terms-terms-of-service" />,
    <Route path="/legal/data-processing" element={<DataProcessingPage />} key="route-terms-data-processing" />,
    <Route path="/legal/cookies" element={<CookiesPage />} key="route-terms-cookies" />,
]
