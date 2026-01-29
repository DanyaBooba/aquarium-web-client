const components = {
    head: {
        themeColor: '#fbf5ee',
    },
}

const background = {
    body: '#fbf5ee',
    surface: '#ffffff',
    popup: '#ffffff',
    level1: '#f3eadf',
    level2: '#eadfce',
}

const text = {
    primary: '#615039',
    secondary: '#7a684e',
}

const primary = {
    50: '#fdfaf6',
    100: '#f6efe6',
    200: '#eadfce',
    300: '#dccbb0',
    400: '#cfb792',
    500: '#D2B48C',
    600: '#b79b73',
    700: '#9a815c',
    800: '#7a684e',
    900: '#5a4a36',
}

const neutral = {
    outlinedBorder: '#e1d3bf',
    outlinedHoverBg: '#f3eadf',
    softBg: '#f1e7da',
    softColor: '#615039',
    softHoverBg: '#eadfce',
    plainHoverBg: '#f3eadf',
    plainActiveBg: '#e1d3bf',
    100: '#f7f1e9',
    800: '#615039',
}

const icon = {
    primary: '#7a684e',
    secondary: '#9a8a73',
}

const colors = {
    neutral: '#fbf5ee',
    plain: '#fbf5ee',
    logo: '#D2B48C',
    logoText: '#fbf5ee',
    bottomNav: {
        bg: 'rgba(251, 245, 238, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#9a8a73',
        iconActive: '#615039',
        iconBgActive: '#f3eadf',
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
            draft: '#f3eadf',
            moderation: {
                start: 'linear-gradient(#ffffff, #fbf5ee)',
                finish: 'linear-gradient(270deg, #eadfce, #dccbb0, #cfb792, #eadfce)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight5 = {
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
