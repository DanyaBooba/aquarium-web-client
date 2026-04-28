import { Grid } from '@mui/joy'
import { AppProfile } from '../../components/app/App'
import LayoutSettings from '../../components/layout/LayoutSettings'
import AppCard, { BlockWebClient } from '../../components/module/AppCard/AppCard'
import { AppStoreLogoIcon, GooglePlayLogoIcon } from '@phosphor-icons/react'

export default function PageSettingsApps() {
    const domain = window.location.origin

    const apps = {
        ios: `${domain}/download/ios`,
        android: `${domain}/download/android`,
        mac: `${domain}/download/macos`,
        windows: `${domain}/download/windows`,
        web: `${domain}`,
    }

    return (
        <AppProfile
            title="Приложения"
            desc="Приложения мессенджера Аквариум"
        >
            <LayoutSettings header="Приложения">
                <Grid container spacing={3}>

                    <Grid xs={12} sm={6}>
                        <AppCard
                            title="iOS"
                            link={apps.ios}
                            moreLink={{
                                title: 'App Store',
                                href: '#',
                                icon: <AppStoreLogoIcon size={18} />
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <AppCard
                            title="Android"
                            link={apps.android}
                            moreLink={{
                                title: 'Google Play',
                                href: '#',
                                icon: <GooglePlayLogoIcon size={18} />
                            }}
                        />
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <AppCard title="macOS" link={apps.mac} />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <AppCard title="Windows" link={apps.windows} />
                    </Grid>

                    {/* 3 линия */}
                    <Grid xs={12}>
                        <BlockWebClient />
                    </Grid>

                </Grid>
            </LayoutSettings>
        </AppProfile>
    )
}
