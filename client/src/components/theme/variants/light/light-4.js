const components = {
    head: {
        themeColor: '#F9F6FF',
    },
}

const background = {
    body: '#F9F6FF',
    surface: '#ffffff',
    popup: '#ffffff',
    level1: '#F1EDFA',
    level2: '#E6E0F2',
}

const text = {
    primary: '#585181',
    secondary: '#746E9C',
}

const primary = {
    50: '#F7F5FF',
    100: '#EDE9FF',
    200: '#DCD6F7',
    300: '#C1B9EE',
    400: '#ABA1E6',
    500: '#9A8FDD',
    600: '#8579C8',
    700: '#6F64AF',
    800: '#585181',
    900: '#403A63',
}

const neutral = {
    outlinedBorder: '#D8D3EA',
    outlinedHoverBg: '#F1EDFA',
    softBg: '#EEEAF9',
    softColor: '#585181',
    softHoverBg: '#E7E2F4',
    plainHoverBg: '#F1EDFA',
    plainActiveBg: '#D8D3EA',
    100: '#F4F1FC',
    800: '#585181',
}

const icon = {
    primary: '#746E9C',
    secondary: '#9A95B8',
}

const colors = {
    neutral: '#F9F6FF',
    plain: '#F9F6FF',
    logo: '#9A8FDD',
    logoText: '#F9F6FF',
    bottomNav: {
        bg: 'rgba(249, 246, 255, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#9A95B8',
        iconActive: '#585181',
        iconBgActive: '#F1EDFA',
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
            draft: '#F1EDFA',
            moderation: {
                start: 'linear-gradient(#ffffff, #F9F6FF)',
                finish: 'linear-gradient(270deg, #E7E2F4, #DCD6F7, #C1B9EE, #E7E2F4)',
            },
            rejected: '#FECACA',
        },
    },
}

export const themeLight4 = {
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
