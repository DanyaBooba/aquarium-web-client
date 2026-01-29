const components = {
    head: {
        themeColor: '#2b2738',
    },
}

const background = {
    body: '#2b2738',
    surface: '#2e2a3b',
    popup: '#312e3f',
    level1: '#363048',
    level2: '#1f1c2b',
}

const text = {
    primary: '#eeedf5',
    secondary: '#cfcbd6',
}

const primary = {
    50: '#f0ecf8',
    100: '#d8d3e8',
    200: '#bfb8d9',
    300: '#a699cb',
    400: '#8f7fbb',
    500: '#74659f',
    600: '#5d4f82',
    700: '#453963',
    800: '#3f3560',
    900: '#1c1825',
}

const neutral = {
    outlinedBorder: '#3b3749',
    outlinedHoverBg: '#2e2a3b',
    softBg: '#2e2a3b',
    softColor: '#d8d4e1',
    softHoverBg: '#3a344e',
    plainHoverBg: '#3a344e',
    plainActiveBg: '#453963',
    100: '#2f2b3f',
    800: '#1f1c2b',
}

const icon = {
    primary: '#d8d4e1',
    secondary: '#9f97aa',
}

const colors = {
    neutral: '#2e2a3b',
    plain: '#2b2738',
    logo: '#b39eb5',
    logoText: '#2b2738',
    bottomNav: {
        bg: 'rgba(43,39,56,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#cfcbd6',
        iconActive: '#eeedf5',
        iconBgActive: '#2e2a3b',
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
        exit: '#663F3F'
    },
    post: {
        status: {
            draft: '#2e2a3b',
            moderation: {
                start: 'linear-gradient(#2b2738, #2b2738)',
                finish: 'linear-gradient(270deg, #2e2a3b, #453963, #3a344e, #2b2738)',
            },
            rejected: '#7f1d3d',
        },
    },
}

export const themeDark4 = {
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
