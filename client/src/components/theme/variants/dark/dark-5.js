const components = {
    head: {
        themeColor: '#2c2c2c',
    },
}

const background = {
    body: '#2c2c2c',
    surface: '#33302b',
    popup: '#3a352f',
    level1: '#3f3a34',
    level2: '#1f1f1f',
}

const text = {
    primary: '#e5e5e5',
    secondary: '#bdbdbd',
}

const primary = {
    50: '#f5f2eb',
    100: '#ded6c4',
    200: '#c7b9a1',
    300: '#b19d7e',
    400: '#9a8367',
    500: '#826954',
    600: '#6b5243',
    700: '#544031',
    800: '#4b3c28',
    900: '#2c2c2c',
}

const neutral = {
    outlinedBorder: '#4a4540',
    outlinedHoverBg: '#33302b',
    softBg: '#33302b',
    softColor: '#dcd7cf',
    softHoverBg: '#40382f',
    plainHoverBg: '#40382f',
    plainActiveBg: '#4f4436',
    100: '#34302d',
    800: '#1f1f1f',
}

const icon = {
    primary: '#dcd7cf',
    secondary: '#9a958f',
}

const colors = {
    neutral: '#33302b',
    plain: '#2c2c2c',
    logo: '#c9a775',
    logoText: '#2c2c2c',
    bottomNav: {
        bg: 'rgba(44,44,44,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#bdbdbd',
        iconActive: '#e5e5e5',
        iconBgActive: '#33302b',
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
            draft: '#33302b',
            moderation: {
                start: 'linear-gradient(#2c2c2c, #2c2c2c)',
                finish: 'linear-gradient(270deg, #33302b, #544031, #40382f, #2c2c2c)',
            },
            rejected: '#7f5f4d',
        },
    },
}

export const themeDark5 = {
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
