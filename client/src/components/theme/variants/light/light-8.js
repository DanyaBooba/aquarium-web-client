const components = {
    head: {
        themeColor: '#FFF9EE',
    },
}

const background = {
    body: '#FFF9EE',
    surface: '#ffffff',
    popup: '#FFF5DD',
    level1: '#FFEFCC',
    level2: '#FFE6B3',
}

const text = {
    primary: '#685D22',
    secondary: '#8B7D4E',
}

const primary = {
    50: '#FFFDF7',
    100: '#FFF3C2',
    200: '#FFEBA3',
    300: '#FFDE66',
    400: '#FFD133',
    500: '#FFAA00',
    600: '#E69500',
    700: '#CC8000',
    800: '#AA6600',
    900: '#804B00',
}

const neutral = {
    outlinedBorder: '#E6D8B3',
    outlinedHoverBg: '#FFF5DD',
    softBg: '#FFF5DD',
    softColor: '#685D22',
    softHoverBg: '#FFEBC2',
    plainHoverBg: '#FFEFCC',
    plainActiveBg: '#E6D8B3',
    100: '#FFF2CC',
    800: '#685D22',
}

const icon = {
    primary: '#8B7D4E',
    secondary: '#C5B87C',
}

const colors = {
    neutral: '#FFF9EE',
    plain: '#FFF9EE',
    logo: '#FFAA00',
    logoText: '#FFF9EE',
    bottomNav: {
        bg: 'rgba(255, 249, 238, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#8B7D4E',
        iconActive: '#FFAA00',
        iconBgActive: '#FFEBC2',
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
        exit: '#FFD6D6',
    },
    post: {
        status: {
            draft: '#FFF5DD',
            moderation: {
                start: 'linear-gradient(#FFF9EE, #FFF5DD)',
                finish: 'linear-gradient(270deg, #FFEBC2, #FFD880, #FFAA00, #FFEBC2)',
            },
            rejected: '#FFB3B3',
        },
    },
}

export const themeLight8 = {
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
