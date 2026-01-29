import { useState, useEffect, useRef } from 'react';
import {
    Typography,
    RadioGroup,
    Radio,
    Sheet,
    Stack,
    Box,
    useColorScheme,
    IconButton,
} from '@mui/joy';
import { useThemeVariants } from '../../components/app/ThemeProvider';
import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import lightTheme from '../../data/themes/light';
import darkTheme from '../../data/themes/dark';

function ThemeLogo({ color, bgColor }) {
    return (
        <svg width="100" height="100" viewBox="0 0 92 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8646 33.0171C37.7476 3.85975 72.9545 5.11909 85.6855 17.3508C85.6855 17.3508 83.8313 35.7035 60.3841 45.8328C43.1074 53.2759 26.2946 45.4367 26.2946 45.4367C23.9046 48.9748 22.9488 56.161 11.7371 61.2757L15.6908 42.2047C13.6958 40.5813 7.88237 35.8465 0.588324 29.8947C11.4523 27.1416 16.1994 30.6105 21.8646 33.0171Z" fill={color}></path>
            <circle cx="62.6046" cy="19.7019" r="5.57944" fill={bgColor}></circle>
        </svg>
    )
}

function ThemePreview({ theme, index, active = false, onClick = () => { } }) {
    const handleClick = () => {
        onClick(index);
    };

    const borderColor = active ? '#5a4fff' : 'transparent';
    const hoverBorderColor = active ? '#5a4fff' : '#5a4fff88';

    return (
        <Sheet
            variant="outlined"
            sx={{
                width: 175,
                p: 1,
                borderRadius: '16px',
                cursor: 'pointer',
                border: `2px solid ${borderColor}`,
                transition: 'border-color 0.2s',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    borderColor: hoverBorderColor,
                },
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    backgroundColor: theme.colors.bg,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 1.5,
                    borderRadius: '8px'
                }}
            >
                <ThemeLogo color={theme.colors.accent} bgColor={theme.colors.bg} />
                <Typography
                    level="title-md"
                    sx={{
                        color: theme.colors.text,
                        fontWeight: 600,
                    }}
                >
                    Аквариум
                </Typography>
            </Box>

            <Box sx={{ height: '100%', pb: 1, pt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography level="title-md" sx={{ fontWeight: '600', textAlign: 'center' }}>
                    {theme.name}
                </Typography>
            </Box>
        </Sheet>
    );
}

function HorizontalScrollThemeList({ title, mode, maxTheme, themes }) {
    const { lightVariant, darkVariant, setLightTheme, setDarkTheme } = useThemeVariants();

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const activeTheme = mode === 'light' ? lightVariant : darkVariant;

    const handleClick = (idTheme) => {
        idTheme = idTheme > 0 && idTheme <= maxTheme ? idTheme : 0;

        if (mode === 'light') {
            setLightTheme(String(idTheme));
        } else {
            setDarkTheme(String(idTheme));
        }
    };

    const checkScrollPosition = () => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const activeEl = container.children[activeTheme];
        if (!activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        const offset =
            itemRect.left
            - containerRect.left
            - (container.clientWidth / 2)
            + (itemRect.width / 2);

        container.scrollBy({
            left: offset,
            behavior: 'smooth',
        });
    }, [activeTheme]);


    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScrollPosition();

        el.addEventListener('scroll', checkScrollPosition);
        window.addEventListener('resize', checkScrollPosition);

        return () => {
            el.removeEventListener('scroll', checkScrollPosition);
            window.removeEventListener('resize', checkScrollPosition);
        };
    }, [themes]);

    const scrollByAmount = (direction) => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollAmount = el.clientWidth * 0.8;

        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <Typography level="body-xs" sx={{ textTransform: 'uppercase', mt: 1, mb: '.25rem', pl: '17.2px' }}>
                {title}
            </Typography>

            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    gap: 1,
                    overflowX: 'auto',
                    py: 1,
                    px: 0.5,

                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },

                    scrollSnapType: 'x mandatory',
                    scrollPaddingLeft: '4px',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {themes.map((item, index) => (
                    <Box
                        key={`${mode}-${index}`}
                        sx={{
                            scrollSnapAlign: 'start',
                            flexShrink: 0
                        }}
                    >
                        <ThemePreview
                            theme={item}
                            index={index}
                            active={activeTheme == index}
                            onClick={handleClick}
                        />
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', pl: '17.2px', gap: '.25rem', mt: '.25rem' }}>
                <IconButton
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    disabled={!canScrollLeft}
                    sx={{ borderRadius: '50px' }}
                    onClick={() => scrollByAmount('left')}
                >
                    <CaretLeft size={20} />
                </IconButton>
                <IconButton
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    disabled={!canScrollRight}
                    sx={{ borderRadius: '50px' }}
                    onClick={() => scrollByAmount('right')}
                >
                    <CaretRight size={20} />
                </IconButton>
            </Box>
        </Box>
    );
}

function SelectVariantTheme() {
    const { mode, setMode } = useColorScheme();

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') ?? 'system');
    const themes = ['system', 'light', 'dark'];

    const showTextTheme = (theme) => {
        const translate = {
            system: 'Системная',
            dark: 'Темная',
            light: 'Светлая'
        }

        return translate[theme]
    }

    const handler = (theme) => {
        theme = themes.includes(theme) ? theme : 'system';
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
        setMode(theme);
    }

    return (
        <Box>
            <Typography level="body-xs" sx={{ textTransform: 'uppercase', mb: '.5rem', pl: '17.2px' }}>Режим темы</Typography>
            <RadioGroup
                orientation="horizontal"
                name="theme"
                value={currentTheme}
                onChange={(event) =>
                    handler(event.target.value)
                }
                sx={{
                    minHeight: 40,
                    padding: .5,
                    borderRadius: '100px',
                    bgcolor: 'neutral.softBg',
                    '--RadioGroup-gap': '4px',
                    '--Radio-actionRadius': '8px',
                }}
            >
                {themes.map((valueTheme, index) => (
                    <Radio
                        key={index}
                        color="neutral"
                        value={valueTheme}
                        disableIcon
                        label={showTextTheme(valueTheme)}
                        variant="plain"
                        sx={{
                            px: 2,
                            alignItems: 'center',
                            flex: 1,
                            textAlign: 'center',
                        }}
                        slotProps={{
                            action: ({ checked }) => ({
                                sx: (theme) => ({
                                    px: 0,
                                    borderRadius: '100px',
                                    width: '100%',
                                    ...(checked && {
                                        '&:hover': {
                                            bgcolor:
                                                theme.palette.mode === 'dark'
                                                    ? 'primary.700'
                                                    : 'background.surface',
                                        },
                                        bgcolor:
                                            theme.palette.mode === 'dark'
                                                ? 'primary.700'
                                                : 'background.surface',
                                        color:
                                            theme.palette.mode === 'dark'
                                                ? 'primary.100'
                                                : 'text.primary',
                                    }),
                                })
                            }),
                        }}
                    />
                ))}
            </RadioGroup>
        </Box>
    )
}

function PageSettingsTheme() {
    return (
        <AppProfile title="Настройки тем" desc="Настройки тем в социальной сети Аквариум">
            <LayoutSettings header="Темы">
                <Stack spacing={2} mt={2}>
                    <SelectVariantTheme />

                    <HorizontalScrollThemeList
                        title="Светлая тема"
                        mode="light"
                        maxTheme={10}
                        themes={lightTheme}
                    />

                    <HorizontalScrollThemeList
                        title="Темная тема"
                        mode="dark"
                        maxTheme={10}
                        themes={darkTheme}
                    />
                </Stack>
            </LayoutSettings>
        </AppProfile>
    );
}

export default PageSettingsTheme;
