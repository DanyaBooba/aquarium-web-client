import { Typography, Box, Stack } from '@mui/joy'

import Post from '../Post/Post'

function ProfilePostsShow({ posts, user }) {
    return (
        <Box mt={4}>
            <Typography level="title-md" sx={{ fontWeight: 600, mb: 2 }}>
                Записи
            </Typography>
            <Stack spacing={2}>
                {posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </Stack>
        </Box>
    )
}

export default ProfilePostsShow
