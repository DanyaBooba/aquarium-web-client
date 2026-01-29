import { Route } from 'react-router-dom'
import ProfileMiddleware from '../middlewares/ProfileMiddleware'

import PageSettings from '../pages/Settings/PageSettings'
import PageSettingsProfile from '../pages/Settings/PageSettingsProfile'
import PageSettingsTheme from '../pages/Settings/PageSettingsTheme'
import PageSettingsLanguage from '../pages/Settings/PageSettingsLanguage'
import PageSettingsAppearance from '../pages/Settings/PageSettingsAppearance'
import PageSettingsNotifications from '../pages/Settings/PageSettingsNotifications'
import PageSettingsDevices from '../pages/Settings/PageSettingsDevices'
import PageSettingsFAQ from '../pages/Settings/PageSettingsFAQ'
import PageSettingsContact from '../pages/Settings/PageSettingsContact'
import PageSettingsProfilePassword from '../pages/Settings/PageSettingsProfilePassword'

export const RoutesProfileSettings = [
    <Route
        path="/settings"
        element={
            <ProfileMiddleware>
                <PageSettings />
            </ProfileMiddleware>
        }
        key="route-u-settings"
    />,
    <Route
        path="/settings/profile"
        element={
            <ProfileMiddleware>
                <PageSettingsProfile />
            </ProfileMiddleware>
        }
        key="route-u-settings-profile"
    />,
    <Route
        path="/settings/profile/password"
        element={
            <ProfileMiddleware>
                <PageSettingsProfilePassword />
            </ProfileMiddleware>
        }
        key="route-u-settings-profile-password"
    />,
    <Route
        path="/settings/theme"
        element={
            <ProfileMiddleware>
                <PageSettingsTheme />
            </ProfileMiddleware>
        }
        key="route-u-settings-theme"
    />,
    <Route
        path="/settings/language"
        element={
            <ProfileMiddleware>
                <PageSettingsLanguage />
            </ProfileMiddleware>
        }
        key="route-u-settings-language"
    />,
    <Route
        path="/settings/appearance"
        element={
            <ProfileMiddleware>
                <PageSettingsAppearance />
            </ProfileMiddleware>
        }
        key="route-u-settings-appearance"
    />,
    <Route
        path="/settings/notifications"
        element={
            <ProfileMiddleware>
                <PageSettingsNotifications />
            </ProfileMiddleware>
        }
        key="route-u-settings-notifications"
    />,
    <Route
        path="/settings/devices"
        element={
            <ProfileMiddleware>
                <PageSettingsDevices />
            </ProfileMiddleware>
        }
        key="route-u-settings-devices"
    />,
    <Route
        path="/settings/faq"
        element={
            <ProfileMiddleware>
                <PageSettingsFAQ />
            </ProfileMiddleware>
        }
        key="route-u-settings-faq"
    />,
    <Route
        path="/settings/contact"
        element={
            <ProfileMiddleware>
                <PageSettingsContact />
            </ProfileMiddleware>
        }
        key="route-u-settings-contact"
    />,
]
