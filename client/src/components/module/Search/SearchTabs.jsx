import { TabList, Tabs, Tab } from '@mui/joy'
import { Box } from '@mui/joy'
import { motion } from 'framer-motion'
import { tabClasses } from '@mui/joy/Tab';

function SearchTabs({ tab, onTabChange }) {
    const handleChange = (event, newValue) => {
        onTabChange(newValue)
        localStorage.setItem('searchTabs', newValue)
    }

    return (
        <Tabs
            value={tab}
            onChange={handleChange}
            size="sm"
            sx={{ bgcolor: 'transparent' }}
        >
            <TabList
                disableUnderline
                sx={(theme) => ({
                    position: 'relative',
                    p: 0.5,
                    gap: 0.5,
                    borderRadius: '50px',
                    bgcolor: 'background.level1',
                    display: 'flex',
                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                    },
                })}
            >
                {['users', 'posts'].map((value) => {
                    const isActive = tab === value

                    return (
                        <Tab
                            key={value}
                            value={value}
                            disableIndicator
                            sx={{
                                position: 'relative',
                                flex: 1,
                                zIndex: 1,
                                borderRadius: '50px',

                                backgroundColor: 'transparent',

                                '&:hover': {
                                    backgroundColor: 'var(--Tab-hoverBg)',
                                },
                                '&:active': {
                                    backgroundColor: 'var(--Tab-activeBg)',
                                },

                                '&.Mui-selected': {
                                    backgroundColor: 'transparent',
                                },
                                border: 'none !important'
                            }}
                        >
                            {isActive && (
                                <Box
                                    component={motion.div}
                                    layoutId="search-tab-bg"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '50px',
                                        zIndex: -1,
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? theme.vars.palette.primary[800]
                                                : theme.vars.palette.background.surface,
                                    })}
                                />
                            )}

                            {value === 'users'
                                ? 'Пользователи'
                                : 'Записи'}
                        </Tab>
                    )
                })}
            </TabList>
        </Tabs>
    )
}

export default SearchTabs
