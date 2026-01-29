import { Typography, Stack, Box, CircularProgress } from '@mui/joy'
import Post from '../Post/Post';
import { usePosts } from '../../../hooks/post/usePosts';
import ServerError, { NotFound } from '../ServerError/ServerError';

function ListShow({ results = [] }) {
    return (
        <>
            <Stack spacing={2}>
                {results.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </Stack>
            <Typography level="body-sm" sx={{ textAlign: 'center', mt: 4 }}>
                Найдено записей: {results.length}
            </Typography>
        </>
    )
}

function PostResults({ query }) {
    const { posts, loading, error } = usePosts();

    const results = Array.isArray(posts)
        ? posts.filter(post =>
            post?.content?.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError />
            ) : posts ? (
                <>
                    {results.length > 0 ? (
                        <ListShow results={results ?? []} />
                    ) : (
                        <NotFound />
                    )}
                </>
            ) : null}
        </>
    )
}

export default PostResults
