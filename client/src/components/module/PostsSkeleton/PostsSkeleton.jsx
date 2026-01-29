import { Typography, Card, CardContent, Skeleton, Stack, AspectRatio } from '@mui/joy';

function PostsSkeleton({ count = 3 }) {
    return (
        <Stack spacing={2} mt={2} useFlexGap>
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} variant="outlined" sx={{ border: 'none', borderRadius: '12px' }}>
                    <CardContent orientation="horizontal">
                        <Skeleton animation="wave" variant="circular" width={48} height={48} />
                        <div>
                            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
                            <Skeleton
                                animation="wave"
                                variant="text"
                                level="body-sm"
                                sx={{ width: 200 }}
                            />
                        </div>
                    </CardContent>
                    <AspectRatio ratio="32/9">
                        <Skeleton animation="wave" variant="overlay">
                            <img
                                alt=""
                                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                            />
                        </Skeleton>
                    </AspectRatio>
                    <Typography sx={{ overflow: 'hidden' }}>
                        <Skeleton animation="wave">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries.
                        </Skeleton>
                    </Typography>
                </Card>
            ))}
        </Stack>
    );
}

export default PostsSkeleton
