const components = {
    head: {
        themeColor: '#0A0A0A',
    },
}

const background = {
    body: '#0A0A0A',
    surface: '#121212',
    popup: '#141414',
    level1: '#1a1a1a',
    level2: '#080808',
}

const text = {
    primary: '#dfdfdf',
    secondary: '#a1a1aa',
}

const primary = {
    50: '#f2edf2',
    100: '#e0d2df',
    200: '#cbb7ca',
    300: '#b597b1',
    400: '#9c7897',
    500: '#8A5C72',
    600: '#734856',
    700: '#593440',
    800: '#3f2029',
    900: '#1a0a12',
};


const neutral = {
    outlinedBorder: '#3a3a3a',
    outlinedHoverBg: '#121212',
    softBg: '#121212',
    softColor: '#dfdfdf',
    softHoverBg: '#1a1a1a',
    plainHoverBg: '#1a1a1a',
    plainActiveBg: '#2a2a2a',
    100: '#1a1a1a',
    800: '#0A0A0A',
}

const icon = {
    primary: '#dfdfdf',
    secondary: '#777777',
}

const colors = {
    neutral: '#121212',
    plain: '#0A0A0A',
    logo: '#8A5C72',
    logoText: '#0A0A0A',
    bottomNav: {
        bg: 'rgba(10,10,10,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#a1a1aa',
        iconActive: '#dfdfdf',
        iconBgActive: '#121212',
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
            draft: '#1a1a1a',
            moderation: {
                start: 'linear-gradient(#0A0A0A, #0A0A0A)',
                finish: 'linear-gradient(270deg, #080808, #8A5C72, #5C4A5C, #0A0A0A)',
            },
            rejected: '#5c404a',
        },
    },
}

export const themeDark10 = {
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
