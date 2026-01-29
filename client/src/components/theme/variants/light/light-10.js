const components = {
    head: {
        themeColor: '#F5F5F5',
    },
}

const background = {
    body: '#F5F5F5',
    surface: '#ffffff',
    popup: '#f0ebf5',
    level1: '#e6e0ed',
    level2: '#dcd6e5',
}

const text = {
    primary: '#4c3f58',
    secondary: '#736376',
}

const primary = {
    50: '#f8f5fb',
    100: '#ede7f5',
    200: '#dccbe9',
    300: '#c3aeda',
    400: '#aa91cc',
    500: '#6C5B7B',
    600: '#5e4e69',
    700: '#4f4157',
    800: '#3b3140',
    900: '#2a2130',
}

const neutral = {
    outlinedBorder: '#d1c7db',
    outlinedHoverBg: '#f0ebf5',
    softBg: '#f0ebf5',
    softColor: '#4c3f58',
    softHoverBg: '#e6e0ed',
    plainHoverBg: '#e6e0ed',
    plainActiveBg: '#d1c7db',
    100: '#f7f5fa',
    800: '#4c3f58',
}

const icon = {
    primary: '#4c3f58',
    secondary: '#736376',
}

const colors = {
    neutral: '#F5F5F5',
    plain: '#F5F5F5',
    logo: '#6C5B7B',
    logoText: '#F5F5F5',
    bottomNav: {
        bg: 'rgba(245, 245, 245, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#736376',
        iconActive: '#4c3f58',
        iconBgActive: '#e6e0ed',
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
            draft: '#f0ebf5',
            moderation: {
                start: 'linear-gradient(#F5F5F5, #f0ebf5)',
                finish: 'linear-gradient(270deg, #e6e0ed, #dcd6e5, #c8b9d7, #e6e0ed)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight10 = {
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
