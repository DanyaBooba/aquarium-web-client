const components = {
    head: {
        themeColor: '#0f101a',
    },
}

const background = {
    body: '#0f101a',
    surface: '#17172e',
    popup: '#1a1a33',
    level1: '#1c1c40',
    level2: '#101022',
}

const text = {
    primary: '#dfe0ff',
    secondary: '#a3a3c2',
}

const primary = {
    50: '#e6ebf7',
    100: '#c7d0eb',
    200: '#a3b3de',
    300: '#8597d1',
    400: '#6b7ec4',
    500: '#5571b8',
    600: '#435fa3',
    700: '#334a86',
    800: '#1f3360',
    900: '#0f1a3a',
}

const neutral = {
    outlinedBorder: '#3a3a50',
    outlinedHoverBg: '#17172e',
    softBg: '#17172e',
    softColor: '#ccccdd',
    softHoverBg: '#2a2a3a',
    plainHoverBg: '#2a2a3a',
    plainActiveBg: '#3f3f55',
    100: '#2c2c42',
    800: '#101022',
}

const icon = {
    primary: '#ccccdd',
    secondary: '#8888aa',
}

const colors = {
    neutral: '#1e1e2e',
    plain: '#17172e',
    logo: '#3390c8',
    logoText: '#0f101a',
    bottomNav: {
        bg: 'rgba(15,16,26,0.7)',
        border: 'rgba(255,255,255,0.05)',
        icon: '#a3a3c2',
        iconActive: '#dfe0ff',
        iconBgActive: '#17172e',
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
            draft: '#2a2a3a',
            moderation: {
                start: 'linear-gradient(#10142a, #10142a)',
                finish: 'linear-gradient(270deg, #1a2c40, #20496a, #1a3b5b, #1a2c40)'
            },
            rejected: '#7f1d1d',
        },
    },
}

export const themeDark1 = {
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
