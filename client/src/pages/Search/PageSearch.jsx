import { AppProfile } from '../../components/app/App'
import { useState } from 'react'
import { Box, Typography } from '@mui/joy'

import SearchBar from '../../components/module/Search/SearchBar'
import SearchTabs from '../../components/module/Search/SearchTabs'
import UserResults from '../../components/module/Search/UserResults'
import PostResults from '../../components/module/Search/PostResults'

function PageSearch() {
    const [query, setQuery] = useState('')
    const [tab, setTab] = useState(localStorage.getItem('searchTabs') ?? 'users')

    return (
        <AppProfile title={tab === 'users' ? 'Поиск пользователей' : 'Поиск записей'} desc="Найдите интересующих вас пользователей и интересные вам записи в социальной сети Аквариум мини" containerSx={{ pt: '0 !important' }}>
            <Box maxWidth="600px" mx="auto" mt={2}>
                <Typography level="h4" sx={{
                    '@media (min-width: 1101px)': {
                        mt: 4
                    }
                }}>
                    Поиск
                </Typography>
                <SearchBar value={query} onChange={setQuery} />
                <SearchTabs tab={tab} onTabChange={setTab} />
                <Box py={2}>
                    {tab === 'users' ? (
                        <UserResults query={query} />
                    ) : (
                        <PostResults query={query} />
                    )}
                </Box>
            </Box>
        </AppProfile >
    )
}

export default PageSearch
