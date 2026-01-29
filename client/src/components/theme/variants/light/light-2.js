const components = {
    head: {
        themeColor: '#faf5eb',
    },
}

const background = {
    body: '#faf5eb',
    surface: '#ffffff',
    popup: '#f7f1e3',
    level1: '#f3e8d8',
    level2: '#efe0c8',
}

const text = {
    primary: '#422420',
    secondary: '#593b2b',
}

const primary = {
    50: '#fdf7f2',
    100: '#f6e7dc',
    200: '#efd2bf',
    300: '#e2b59a',
    400: '#d18f6e',
    500: '#c06a4a',
    600: '#a9543b',
    700: '#8a4331',
    800: '#5f2f26',
    900: '#422420',
}

const neutral = {
    outlinedBorder: '#e2d3c0',
    outlinedHoverBg: '#f7f1e3',
    softBg: '#f7f1e3',
    softColor: '#422420',
    softHoverBg: '#f0e4d0',
    plainHoverBg: '#f3e8d8',
    plainActiveBg: '#e2d3c0',
    100: '#f6eee2',
    800: '#4a2f28',
}

const icon = {
    primary: '#422420',
    secondary: '#7a5646',
}

const colors = {
    neutral: '#faf5eb',
    plain: '#faf5eb',
    logo: '#FF6F61',
    logoText: '#faf5eb',
    bottomNav: {
        bg: 'rgba(250, 245, 235, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#7a5646',
        iconActive: '#422420',
        iconBgActive: '#f3e8d8',
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
            draft: '#f7f1e3',
            moderation: {
                start: 'linear-gradient(#faf5eb, #f7f1e3)',
                finish: 'linear-gradient(270deg, #f3e8d8, #efe0c8, #eed8b5, #f3e8d8)',
            },
            rejected: '#ffcac2',
        },
    },
}

export const themeLight2 = {
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
