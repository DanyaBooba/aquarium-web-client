import { Typography, Card, CardContent, Skeleton, Stack, AspectRatio } from '@mui/joy';

function PostsSkeleton({ count = 3 }) {
    return (
        <Stack spacing={2} mt={2} useFlexGap>
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} variant="outlined" sx={{ border: 'none', borderRadius: '24px' }}>
                    <CardContent orientation="horizontal">
                        <Skeleton animation="wave" variant="circular" width={48} height={48} />
                        <div>
                            <Skeleton animation="wave" variant="text" sx={{ width: 120, borderRadius: '999px' }} />
                            <Skeleton
                                animation="wave"
                                variant="text"
                                level="body-sm"
                                sx={{ width: 200, borderRadius: '999px' }}
                            />
                        </div>
                    </CardContent>
                    <AspectRatio ratio="32/9" sx={{ borderRadius: '24px' }}>
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                    </AspectRatio>
                    <Typography sx={{ overflow: 'hidden' }} >
                        <Skeleton animation="wave" sx={{ borderRadius: '999px' }}>
                            Lorem ipsum is placeholder
                        </Skeleton>
                    </Typography>
                </Card>
            ))}
        </Stack>
    );
}

export default PostsSkeleton
