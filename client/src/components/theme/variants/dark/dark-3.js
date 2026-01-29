const components = {
    head: {
        themeColor: '#0c0e0b',
    },
}

const background = {
    body: '#0c0e0b',
    surface: '#151815',
    popup: '#1a1d18',
    level1: '#1f241f',
    level2: '#080a07',
}

const text = {
    primary: '#dbe6db',
    secondary: '#a8b3a8',
}

const primary = {
    50: '#f5f5f5',
    100: '#dcdcdc',
    200: '#a8a8a8',
    300: '#a3a3a3',
    400: '#8c8c8c',
    500: '#757575',
    600: '#5f5f5f',
    700: '#606060',
    800: '#333333',
    900: '#1a1a1a',
}

const neutral = {
    outlinedBorder: '#3a3a3a',
    outlinedHoverBg: '#1a1a1a',
    softBg: '#1a1a1a',
    softColor: '#cccccc',
    softHoverBg: '#2a2a2a',
    plainHoverBg: '#2a2a2a',
    plainActiveBg: '#3f3f3f',
    100: '#2c2c2c',
    800: '#1a1a1a',
}

const icon = {
    primary: '#c5d1c5',
    secondary: '#7a8a7a',
}

const colors = {
    logo: '#2a7f2a',
    logoText: '#dbe6db',
    bottomNav: {
        bg: 'rgba(12,14,11,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#a8b3a8',
        iconActive: '#dbe6db',
        iconBgActive: '#151815',
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
        exit: '#663F3F'
    },
    post: {
        status: {
            draft: '#1f241f',
            moderation: {
                start: 'linear-gradient(#0c0e0b, #0c0e0b)',
                finish: 'linear-gradient(270deg, #0f1a0f, #1a2a1a, #0f2010, #0c0e0b)'
            },
            rejected: '#5f1d1d',
        },
    },
}

export const themeDark3 = {
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
