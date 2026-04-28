import { Tabs, TabList, Tab, Box } from '@mui/joy'
import { motion } from 'framer-motion'
import { tabClasses } from '@mui/joy/Tab';

function ProfileTabs({ tab, setTab }) {
    const handleChange = (event, newValue) => {
        setTab(newValue)
        localStorage.setItem('profileTabs', newValue)
    }

    const tabs = [
        { value: 'posts', label: 'Записи' },
        { value: 'likes', label: 'Лайкнутое' },
        { value: 'bookmarks', label: 'Избранное' },
    ]

    return (
        <Tabs
            aria-label="profile tabs"
            value={tab}
            onChange={handleChange}
            size="sm"
            sx={{
                bgcolor: 'transparent',
                mt: 2,
                position: 'sticky',
                top: '8px',
                zIndex: '1000',

            }}
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
                {tabs.map(({ value, label }) => {
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
                                '&:hover': { backgroundColor: 'var(--Tab-hoverBg)' },
                                '&:active': { backgroundColor: 'var(--Tab-activeBg)' },
                                '&.Mui-selected': { backgroundColor: 'transparent' },
                                border: 'none !important',
                            }}
                        >
                            {isActive && (
                                <Box
                                    component={motion.div}
                                    layoutId="profile-tab-bg"
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

                            {label}
                        </Tab>
                    )
                })}
            </TabList>
        </Tabs>
    )
}

export default ProfileTabs
