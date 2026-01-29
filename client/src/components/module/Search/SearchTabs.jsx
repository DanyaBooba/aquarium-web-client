import { TabList, Tabs } from '@mui/joy'
import Tab, { tabClasses } from '@mui/joy/Tab'

function SearchTabs({ tab, onTabChange }) {
    const handleChange = (event, newValue) => {
        onTabChange(newValue)
        localStorage.setItem('searchTabs', newValue)
    }

    return (
        <Tabs
            aria-label="tabs"
            size="sm"
            value={tab}
            defaultValue={0}
            onChange={handleChange}
            sx={{ bgcolor: 'transparent' }}>
            <TabList
                disableUnderline
                sx={(theme) => ({
                    p: 0.5,
                    gap: 0.5,
                    borderRadius: '50px',
                    bgcolor: 'background.level1',
                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                        bgcolor:
                            theme.palette.mode === 'dark'
                                ? 'primary.700'
                                : 'background.surface',
                        color:
                            theme.palette.mode === 'dark'
                                ? 'primary.100'
                                : 'text.primary',
                        borderRadius: '50px',
                    },
                    [`& .${tabClasses.root}`]: {
                        flex: 1,
                        color: 'text.primary'
                    },
                })}
            >
                <Tab value="users" disableIndicator>Пользователи</Tab>
                <Tab value="posts" disableIndicator>Записи</Tab>
            </TabList>
        </Tabs>
    )
}

export default SearchTabs
