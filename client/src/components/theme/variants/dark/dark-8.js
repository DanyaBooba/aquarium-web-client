const components = {
    head: {
        themeColor: '#1e1e1e',
    },
}

const background = {
    body: '#1e1e1e',
    surface: '#282828',
    popup: '#2c2c2c',
    level1: '#333333',
    level2: '#101010',
}

const text = {
    primary: '#e5e5e5',
    secondary: '#bfbfbf',
}

const primary = {
    50: '#fdf5d7',
    100: '#fbe8a5',
    200: '#f8da73',
    300: '#f5cc41',
    400: '#f2bf1f',
    500: '#d4af37',
    600: '#b8962e',
    700: '#997b25',
    800: '#7d611c',
    900: '#1e1e1e',
}

const neutral = {
    outlinedBorder: '#4a4a4a',
    outlinedHoverBg: '#282828',
    softBg: '#282828',
    softColor: '#e5e5e5',
    softHoverBg: '#333333',
    plainHoverBg: '#333333',
    plainActiveBg: '#4a4a4a',
    100: '#333333',
    800: '#1e1e1e',
}

const icon = {
    primary: '#e5e5e5',
    secondary: '#999999',
}

const colors = {
    neutral: '#282828',
    plain: '#1e1e1e',
    logo: '#D4AF37',
    logoText: '#1e1e1e',
    bottomNav: {
        bg: 'rgba(30,30,30,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#bfbfbf',
        iconActive: '#e5e5e5',
        iconBgActive: '#282828',
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
            draft: '#333333',
            moderation: {
                start: 'linear-gradient(#1e1e1e, #1e1e1e)',
                finish: 'linear-gradient(270deg, #282828, #d4af37, #b8962e, #282828)',
            },
            rejected: '#7f5c00',
        },
    },
}

export const themeDark8 = {
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
