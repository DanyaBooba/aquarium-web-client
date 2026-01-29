const components = {
    head: {
        themeColor: '#f4f9ff',
    },
}

const background = {
    body: '#f4f9ff',
    surface: '#ffffff',
    popup: '#ebf2f8',
    level1: '#e2e9f2',
    level2: '#d8e1eb',
}

const text = {
    primary: '#283340',
    secondary: '#4a5a6a',
}

const primary = {
    50: '#f0f7fc',
    100: '#dceef7',
    200: '#b9dff0',
    300: '#8ccae6',
    400: '#5fb5dc',
    500: '#2fa0d1',
    600: '#1f86b5',
    700: '#1b6d93',
    800: '#1a4f66',
    900: '#123648',
}

const neutral = {
    outlinedBorder: '#c8d4de',
    outlinedHoverBg: '#ebf2f8',
    softBg: '#ebf2f8',
    softColor: '#283340',
    softHoverBg: '#dce8f2',
    plainHoverBg: '#e2e9f2',
    plainActiveBg: '#c8d4de',
    100: '#eef4f9',
    800: '#2b3a48',
}

const icon = {
    primary: '#283340',
    secondary: '#6b7c8c',
}

const colors = {
    neutral: '#ffffff',
    plain: '#ffffff',
    logo: '#00B4D8',
    logoText: '#f4f9ff',
    bottomNav: {
        bg: 'rgba(244, 249, 255, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#6b7c8c',
        iconActive: '#283340',
        iconBgActive: '#dce8f2',
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
            draft: '#eaf2f8',
            moderation: {
                start: 'linear-gradient(#f4f9ff, #ebf2f8)',
                finish: 'linear-gradient(270deg, #dce8f2, #bcd6e5, #80b8d8, #dce8f2)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight1 = {
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
