const components = {
    head: {
        themeColor: '#121212',
    },
}

const background = {
    body: '#121212',
    surface: '#1a1a1a',
    popup: '#1c1c1c',
    level1: '#222222',
    level2: '#101010',
}

const text = {
    primary: '#dfdfdf',
    secondary: '#a1a1aa',
}

const primary = {
    50: '#ffe6cc',
    100: '#ffcc99',
    200: '#ffb366',
    300: '#ff9933',
    400: '#ff8c00',
    500: '#e67c00',
    600: '#b35f00',
    700: '#804200',
    800: '#4d2600',
    900: '#121212',
}

const neutral = {
    outlinedBorder: '#3a3a3a',
    outlinedHoverBg: '#1a1a1a',
    softBg: '#1a1a1a',
    softColor: '#dfdfdf',
    softHoverBg: '#2a2a2a',
    plainHoverBg: '#2a2a2a',
    plainActiveBg: '#3f3f3f',
    100: '#2c2c2c',
    800: '#121212',
}

const icon = {
    primary: '#dfdfdf',
    secondary: '#777777',
}

const colors = {
    neutral: '#1a1a1a',
    plain: '#121212',
    logo: '#FF8C00',
    logoText: '#121212',
    bottomNav: {
        bg: 'rgba(18,18,18,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#a1a1aa',
        iconActive: '#dfdfdf',
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
        exit: '#663F3F',
    },
    post: {
        status: {
            draft: '#2a2a2a',
            moderation: {
                start: 'linear-gradient(#121212, #121212)',
                finish: 'linear-gradient(270deg, #1a1a1a, #ff8c00, #e67c00, #1a1a1a)',
            },
            rejected: '#7f3d00',
        },
    },
}

export const themeDark9 = {
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
