const components = {
    head: {
        themeColor: '#f8fafc',
    },
}

const background = {
    body: '#f8fafc',
    surface: '#ffffff',
    popup: '#ffffff',
    level1: '#f1f5f9',
    level2: '#e2e8f0',
}

const text = {
    primary: '#0f172a',
    secondary: '#475569',
}

const neutral = {
    outlinedBorder: '#cbd5e1',
    outlinedHoverBg: '#f1f5f9',
    softColor: '#1e293b',
    softHoverBg: '#dbeafe',
    plainHoverBg: '#e2e8f0',
    plainActiveBg: '#cbd5e1',
}

const colors = {
    neutral: '#ffffff',
    plain: '#ffffff',
    logo: '#0a6bcb',
    logoText: '#ffffff',
    bottomNav: {
        bg: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(0, 0, 0, 0.06)',
        icon: '#64748b',
        iconActive: '#0f172a',
        iconBgActive: '#dbeafe',
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
            draft: '#ededed',
            moderation: {
                start: 'linear-gradient(#ffffff, #f8fafc)',
                finish: 'linear-gradient(270deg, #dbeafe, #bfdbfe, #93c5fd, #dbeafe)',
            },
            rejected: '#fecaca',
        },
    },
}

export const themeLight0 = {
    components: components,
    palette: {
        background: background,
        text: text,
        neutral: neutral,
    },
    colors: colors,
}
