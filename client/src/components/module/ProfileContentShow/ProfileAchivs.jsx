import { Avatar, Typography, Box, Stack, Link } from '@mui/joy'
import { Trophy } from '@phosphor-icons/react'
import { useTheme } from '@mui/joy/styles';

function ProfileAchivs({ jsonAchivs = [] }) {
    const theme = useTheme()

    jsonAchivs = [{}]

    if (!!jsonAchivs && jsonAchivs.length > 0) {
        return (
            <Box mt={3} sx={{ position: 'relative' }}>
                <Link
                    href="/u/achievements"
                    overlay
                    aria-label="Открыть достижения"
                    sx={{ textDecoration: 'none !important' }}
                >
                    <Box>
                        <Typography level="title-sm" sx={{ mb: 1 }}>
                            Достижения
                        </Typography>
                        <Stack direction="row" spacing={1} overflow="auto">
                            {jsonAchivs.map((item, index) => (
                                <Avatar
                                    key={index}
                                    variant="plain"
                                    size="lg"
                                    sx={{ backgroundColor: theme.colors.plain }}
                                >
                                    <Trophy />
                                </Avatar>
                            ))}
                        </Stack>
                    </Box>
                </Link>
            </Box>
        )
    }
}

export default ProfileAchivs
