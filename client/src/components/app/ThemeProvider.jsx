import { CssVarsProvider, useColorScheme, useTheme } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import { createTheme } from '../theme/createTheme';
import { useEffect, useState, createContext, useContext } from 'react';

const ThemeVariantsContext = createContext(null);

function ThemeSelectionStyles() {
    const theme = useTheme();

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty(
            '--selection-bg',
            theme.colors.logo
        );

        root.style.setProperty(
            '--selection-color',
            theme.colors.logoText
        );
    }, [theme]);

    return null;
}

function ThemeMetaUpdater() {
    const { mode } = useColorScheme();
    const theme = useTheme();

    useEffect(() => {
        const meta = document.querySelector("meta[name='theme-color']");
        if (!meta) return;

        meta.setAttribute(
            'content',
            theme.components.head.themeColor[mode]
        );
    }, [mode, theme]);

    return null;
}

export function ThemeProvider({ children }) {
    const [lightVariant, setLightVariant] = useState(
        () => localStorage.getItem('lightTheme') ?? '0'
    );

    const [darkVariant, setDarkVariant] = useState(
        () => localStorage.getItem('darkTheme') ?? '0'
    );

    const setLightTheme = (value) => {
        localStorage.setItem('lightTheme', value);
        setLightVariant(value);
    };

    const setDarkTheme = (value) => {
        localStorage.setItem('darkTheme', value);
        setDarkVariant(value);
    };

    return (
        <ThemeVariantsContext.Provider
            value={{ lightVariant, darkVariant, setLightTheme, setDarkTheme }}
        >
            <CssVarsProvider
                key={`${lightVariant}-${darkVariant}`}
                theme={createTheme(lightVariant, darkVariant)}
                defaultMode="system"
            >
                <CssBaseline />
                <ThemeSelectionStyles />
                <style>
                    {`
                        ::selection {
                            background-color: var(--selection-bg);
                            color: var(--selection-color);
                        }
                    `}
                </style>
                <ThemeMetaUpdater />
                {children}
            </CssVarsProvider>
        </ThemeVariantsContext.Provider>
    );
}

export const useThemeVariants = () => {
    const ctx = useContext(ThemeVariantsContext);
    if (!ctx) {
        throw new Error('useThemeVariants must be used inside ThemeProvider');
    }
    return ctx;
};
