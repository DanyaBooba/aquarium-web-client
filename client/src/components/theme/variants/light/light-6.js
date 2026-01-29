const components = {
    head: {
        themeColor: '#f4fafc',
    },
}

const background = {
    body: '#f4fafc',
    surface: '#ffffff',
    popup: '#edf6f9',
    level1: '#e6f1f5',
    level2: '#dbeaf0',
}

const text = {
    primary: '#2d4b56',
    secondary: '#4a6a75',
}

const primary = {
    50: '#f2f9fb',
    100: '#ddeff5',
    200: '#c1e1ec',
    300: '#9ccedd',
    400: '#6fb6cb',
    500: '#3f9db8',
    600: '#31819a',
    700: '#276a7e',
    800: '#1e4f5f',
    900: '#153640',
}

const neutral = {
    outlinedBorder: '#c7dbe3',
    outlinedHoverBg: '#edf6f9',
    softBg: '#e6f1f5',
    softColor: '#2d4b56',
    softHoverBg: '#ddeff5',
    plainHoverBg: '#e6f1f5',
    plainActiveBg: '#c7dbe3',
    100: '#eef6f9',
    800: '#2d4b56',
}

const icon = {
    primary: '#4a6a75',
    secondary: '#7fa3b0',
}

const colors = {
    neutral: '#f4fafc',
    plain: '#f4fafc',
    logo: '#3f9db8',
    logoText: '#f4fafc',
    bottomNav: {
        bg: 'rgba(244, 250, 252, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#7fa3b0',
        iconActive: '#2d4b56',
        iconBgActive: '#e6f1f5',
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
            draft: '#edf6f9',
            moderation: {
                start: 'linear-gradient(#ffffff, #f4fafc)',
                finish: 'linear-gradient(270deg, #ddeff5, #c1e1ec, #9ccedd, #ddeff5)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight6 = {
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
