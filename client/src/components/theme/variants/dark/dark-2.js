const components = {
    head: {
        themeColor: '#1c1b20',
    },
}

const background = {
    body: '#1c1b20',
    surface: '#25232c',
    popup: '#2a272f',
    level1: '#302d36',
    level2: '#18161c',
}

const text = {
    primary: '#e4e1e6',
    secondary: '#bdb7c0'
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
    primary: '#d4cfd6',
    secondary: '#9f9aa3',
}

const colors = {
    neutral: '#1e1e1e',
    plain: '#1a1a1a',
    logo: '#c75b4e',
    logoText: '#e4e1e6',
    bottomNav: {
        bg: 'rgba(18, 18, 18, 0.7)',
        border: 'rgba(255, 255, 255, 0.05)',
        icon: '#a1a1aa',
        iconActive: '#e0e0e0',
        iconBgActive: '#1a1a1a',
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
            draft: '#3a3a3a',
            moderation: {
                start: 'linear-gradient(#1e293b, #1e293b)',
                finish: 'linear-gradient(270deg, #1a2c40, #20496a, #1a3b5b, #1a2c40)'
            },
            rejected: '#7f1d1d',
        },
    },
}

export const themeDark2 = {
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
