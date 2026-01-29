const components = {
    head: {
        themeColor: '#eef8f3',
    },
}

const background = {
    body: '#eef8f3',
    surface: '#ffffff',
    popup: '#ffffff',
    level1: '#e3f2ea',
    level2: '#d3e8dd',
}

const text = {
    primary: '#214f35',
    secondary: '#3b6b50',
}

const primary = {
    50: '#f2fbf7',
    100: '#dcf2e8',
    200: '#bfe4d3',
    300: '#93cfb4',
    400: '#5fb08c',
    500: '#2e8b57',
    600: '#25724a',
    700: '#1f5d3e',
    800: '#17422d',
    900: '#102d1f',
}

const neutral = {
    outlinedBorder: '#c7ded1',
    outlinedHoverBg: '#e3f2ea',
    softBg: '#dbf3e8',
    softColor: '#214f35',
    softHoverBg: '#dff0e6',
    plainHoverBg: '#e3f2ea',
    plainActiveBg: '#c7ded1',
    100: '#eaf6f0',
    800: '#214f35',
}

const icon = {
    primary: '#3b6b50',
    secondary: '#6f9c86',
}

const colors = {
    neutral: '#eef8f3',
    plain: '#eef8f3',
    logo: '#2E8B57',
    logoText: '#eef8f3',
    bottomNav: {
        bg: 'rgba(238, 248, 243, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#6f9c86',
        iconActive: '#214f35',
        iconBgActive: '#e3f2ea',
    },
    settings: {
        profile: '#D0E7FA',
        devices: '#FFE8CC',
        privacy: '#E5E1F0',
        notifications: '#F9D0E1',
        appearance: '#E9D5F6',
        themes: '#FFF5BF',
        language: '#C8EFE7',
        goMain: '#DCE1FB',
        exit: '#FFD6D6'
    },
    post: {
        status: {
            draft: '#e3f2ea',
            moderation: {
                start: 'linear-gradient(#ffffff, #eef8f3)',
                finish: 'linear-gradient(270deg, #dff0e6, #bfe4d3, #93cfb4, #dff0e6)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight3 = {
    components: components,
    palette: {
        background: background,
        text: text,
        primary: primary,
        neutral: neutral,
        icon: icon,
    },
    colors: colors,
}
