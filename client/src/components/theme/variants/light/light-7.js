const components = {
    head: {
        themeColor: '#FFF0F5',
    },
}

const background = {
    body: '#FFF0F5',
    surface: '#ffffff',
    popup: '#FBE7EE',
    level1: '#F6DCE4',
    level2: '#EECBD6',
}

const text = {
    primary: '#673742',
    secondary: '#8A5562',
}

const primary = {
    50: '#FFF6F9',
    100: '#FFE1EA',
    200: '#FFC1D1',
    300: '#FF9FB8',
    400: '#FF829F',
    500: '#FF6F91',
    600: '#E85A7D',
    700: '#C94868',
    800: '#9C364F',
    900: '#6E2437',
}

const neutral = {
    outlinedBorder: '#E7C3CF',
    outlinedHoverBg: '#FBE7EE',
    softBg: '#F6DCE4',
    softColor: '#673742',
    softHoverBg: '#F3D0DB',
    plainHoverBg: '#F6DCE4',
    plainActiveBg: '#E7C3CF',
    100: '#FCEEF3',
    800: '#673742',
}

const icon = {
    primary: '#8A5562',
    secondary: '#B18490',
}

const colors = {
    neutral: '#FFF0F5',
    plain: '#FFF0F5',
    logo: '#FF6F91',
    logoText: '#FFF0F5',
    bottomNav: {
        bg: 'rgba(255, 240, 245, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#B18490',
        iconActive: '#673742',
        iconBgActive: '#F6DCE4',
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
            draft: '#FBE7EE',
            moderation: {
                start: 'linear-gradient(#ffffff, #FFF0F5)',
                finish: 'linear-gradient(270deg, #F6DCE4, #FFC1D1, #FF9FB8, #F6DCE4)',
            },
            rejected: '#ffb4c2',
        },
    },
}

export const themeLight7 = {
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
