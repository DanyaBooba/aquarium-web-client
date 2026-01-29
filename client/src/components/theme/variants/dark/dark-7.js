const components = {
    head: {
        themeColor: '#2e1e1e',
    },
}

const background = {
    body: '#2e1e1e',
    surface: '#37262a',
    popup: '#3d2b2f',
    level1: '#462f33',
    level2: '#1a1111',
}

const text = {
    primary: '#ece5e5',
    secondary: '#cfc6c6',
}

const primary = {
    50: '#f8e6ea',
    100: '#efc6d0',
    200: '#e5a4b5',
    300: '#db829b',
    400: '#d55e82',
    500: '#ce4269',
    600: '#b33a5c',
    700: '#962f4c',
    800: '#7a243d',
    900: '#2e1e1e',
}

const neutral = {
    outlinedBorder: '#533b3d',
    outlinedHoverBg: '#37262a',
    softBg: '#37262a',
    softColor: '#e4d8d8',
    softHoverBg: '#462f33',
    plainHoverBg: '#462f33',
    plainActiveBg: '#533b3d',
    100: '#3b2628',
    800: '#1a1111',
}

const icon = {
    primary: '#e4d8d8',
    secondary: '#a88f92',
}

const colors = {
    neutral: '#37262a',
    plain: '#2e1e1e',
    logo: '#D94A64',
    logoText: '#2e1e1e',
    bottomNav: {
        bg: 'rgba(46,30,30,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#cfc6c6',
        iconActive: '#ece5e5',
        iconBgActive: '#37262a',
    },
    settings: {
        profile: '#3A5A6A',
        devices: '#665040',
        privacy: '#4D4866',
        notifications: '#66424F',
        appearance: '#5B4370',
        themes: '#665E33',
        language: '#3A665C',
        goMain: '#3C466A',
        exit: '#663F3F',
    },
    post: {
        status: {
            draft: '#37262a',
            moderation: {
                start: 'linear-gradient(#2e1e1e, #2e1e1e)',
                finish: 'linear-gradient(270deg, #37262a, #d95c72, #b33a5c, #37262a)',
            },
            rejected: '#8c3b4b',
        },
    },
}

export const themeDark7 = {
    components: components,
    palette: {
        background: background,
        text: text,
        primary: primary,
        neutral: neutral,
        icon: icon,
    },
    colors: colors,
};
