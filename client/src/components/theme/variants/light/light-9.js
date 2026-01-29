const components = {
    head: {
        themeColor: '#F5F5F5',
    },
}

const background = {
    body: '#F5F5F5',
    surface: '#ffffff',
    popup: '#f0ece0',
    level1: '#e6e1d2',
    level2: '#dcd5c3',
}

const text = {
    primary: '#60430f',
    secondary: '#8b6e4c',
}

const primary = {
    50: '#FFF8F0',
    100: '#FFE8C2',
    200: '#FFD699',
    300: '#FFC266',
    400: '#FFB033',
    500: '#FFA500',
    600: '#E69500',
    700: '#CC8000',
    800: '#AA6600',
    900: '#804B00',
}

const neutral = {
    outlinedBorder: '#d6cbb7',
    outlinedHoverBg: '#f0ece0',
    softBg: '#f0ece0',
    softColor: '#60430f',
    softHoverBg: '#e6e1d2',
    plainHoverBg: '#e6e1d2',
    plainActiveBg: '#d6cbb7',
    100: '#f7f4ef',
    800: '#60430f',
}

const icon = {
    primary: '#60430f',
    secondary: '#8b6e4c',
}

const colors = {
    neutral: '#F5F5F5',
    plain: '#F5F5F5',
    logo: '#FFA500',
    logoText: '#F5F5F5',
    bottomNav: {
        bg: 'rgba(245, 245, 245, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#8b6e4c',
        iconActive: '#60430f',
        iconBgActive: '#e6e1d2',
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
            draft: '#f0ece0',
            moderation: {
                start: 'linear-gradient(#F5F5F5, #f0ece0)',
                finish: 'linear-gradient(270deg, #e6e1d2, #d6cbb7, #bfa981, #e6e1d2)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight9 = {
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
