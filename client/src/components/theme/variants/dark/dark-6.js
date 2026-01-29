const components = {
    head: {
        themeColor: '#1e2a3a',
    },
}

const background = {
    body: '#1e2a3a',
    surface: '#223445',
    popup: '#25384d',
    level1: '#2a4055',
    level2: '#131c26',
}

const text = {
    primary: '#d9dde2',
    secondary: '#a0a8b0',
}

const primary = {
    50: '#e6f0f7',
    100: '#bcd5e2',
    200: '#92bacd',
    300: '#68a1b9',
    400: '#4d8aa6',
    500: '#337290',
    600: '#2b5c77',
    700: '#22485f',
    800: '#1b3a4b',
    900: '#1e2a3a',
}

const neutral = {
    outlinedBorder: '#2c3b49',
    outlinedHoverBg: '#223445',
    softBg: '#223445',
    softColor: '#cfd6dc',
    softHoverBg: '#2a4055',
    plainHoverBg: '#2a4055',
    plainActiveBg: '#334a5f',
    100: '#1f2a37',
    800: '#131c26',
}

const icon = {
    primary: '#cfd6dc',
    secondary: '#7a8b9a',
}

const colors = {
    neutral: '#223445',
    plain: '#1e2a3a',
    logo: '#66A6B3',
    logoText: '#1e2a3a',
    bottomNav: {
        bg: 'rgba(30,42,58,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#a0a8b0',
        iconActive: '#d9dde2',
        iconBgActive: '#223445',
    },
    settings: {
        profile: '#3A5A6A',
        devices: '#665040',
        privacy: '#4D4866',
        notifications: '#66424F',
        appearance: '#5B4370',
        themes: '#665E33',
        language: '#3A665C',
        goMain: '#3C466A',
        exit: '#663F3F',
    },
    post: {
        status: {
            draft: '#223445',
            moderation: {
                start: 'linear-gradient(#1e2a3a, #1e2a3a)',
                finish: 'linear-gradient(270deg, #223445, #4d7b93, #3a667d, #223445)',
            },
            rejected: '#5c737e',
        },
    },
}

export const themeDark6 = {
    components: components,
    palette: {
        background: background,
        text: text,
        primary: primary,
        neutral: neutral,
        icon: icon,
    },
    colors: colors,
};
