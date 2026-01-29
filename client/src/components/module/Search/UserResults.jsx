import { List, Typography, Box, CircularProgress } from '@mui/joy'
import { useUsers } from '../../../hooks/user/useUsers'
import PersonShow from '../PersonShow/PersonShow'
import ServerError, { NotFound } from '../ServerError/ServerError';

function ListShow({ results = [] }) {
    return (
        <>
            <List>
                {results.map((user, index) => <PersonShow user={user} key={index} />)}
            </List>
            <Typography level="body-sm" sx={{ textAlign: 'center', mt: 4 }}>
                Найдено пользователей: {results.length}
            </Typography>
        </>
    )
}

function UserResults({ query }) {
    const { users, error, loading } = useUsers();

    const lowerQuery = query.toLowerCase();

    const results = Array.isArray(users)
        ? users.filter(user => {
            const firstName = user?.firstName?.toLowerCase() || '';
            const lastName = user?.lastName?.toLowerCase() || '';
            const username = user?.username?.toLowerCase() || '';
            const description = user?.description?.toLowerCase() || '';

            return (
                firstName.includes(lowerQuery) ||
                lastName.includes(lowerQuery) ||
                username.includes(lowerQuery) ||
                description.includes(lowerQuery)
            );
        })
        : [];

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : users ? (
                <>
                    {results.length > 0 ? (
                        <ListShow results={results ?? []} />
                    ) : (
                        <NotFound title="Пользователи не найдены" />
                    )}
                </>
            ) : null}
        </>
    )
}

export default UserResults
