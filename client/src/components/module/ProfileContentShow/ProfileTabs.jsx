import { TabList, Tabs } from '@mui/joy'
import Tab, { tabClasses } from '@mui/joy/Tab'

function ProfileTabs({ tab, setTab }) {
    const handleChange = (event, newValue) => {
        setTab(newValue)
        localStorage.setItem('profileTabs', newValue)
    }

    return (
        <Tabs
            aria-label="tabs"
            size="sm"
            value={tab}
            defaultValue={0}
            onChange={handleChange}
            sx={{ bgcolor: 'transparent', mt: 2 }}>
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
                <Tab value="posts" disableIndicator>Записи</Tab>
                <Tab value="likes" disableIndicator>Лайкнутое</Tab>
                <Tab value="bookmarks" disableIndicator>Избранное</Tab>
            </TabList>
        </Tabs>
    )
}

export default ProfileTabs
