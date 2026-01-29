import { AppProfile } from '../../components/app/App'
import {
    Typography,
    Grid,
    Box,
    Stack,
} from '@mui/joy';
import {
    Star,
    Fire,
    Trophy,
    Rocket,
    Medal
} from '@phosphor-icons/react';

const achievements = [
    {
        icon: <Star size={40} weight="fill" color="#FFD700" />,
        title: 'С первых минут',
    },
    {
        icon: <Fire size={40} weight="fill" color="#FF5722" />,
        title: 'Поддержка проекта',
    },
    {
        icon: <Trophy size={40} weight="fill" color="#B0C4DE" />,
        title: 'Автор проекта',
    },
    {
        icon: <Star size={40} weight="fill" color="#FFD700" />,
        title: 'С первых минут',
    },
    {
        icon: <Fire size={40} weight="fill" color="#FF5722" />,
        title: 'Поддержка проекта',
    },
    {
        icon: <Trophy size={40} weight="fill" color="#B0C4DE" />,
        title: 'Автор проекта',
    },
    {
        icon: <Star size={40} weight="fill" color="#FFD700" />,
        title: 'С первых минут',
    },
    {
        icon: <Fire size={40} weight="fill" color="#FF5722" />,
        title: 'Поддержка проекта',
    },
    {
        icon: <Trophy size={40} weight="fill" color="#B0C4DE" />,
        title: 'Автор проекта',
    },
    {
        icon: <Star size={40} weight="fill" color="#FFD700" />,
        title: 'С первых минут',
    },
    {
        icon: <Fire size={40} weight="fill" color="#FF5722" />,
        title: 'Поддержка проекта',
    },
    {
        icon: <Trophy size={40} weight="fill" color="#B0C4DE" />,
        title: 'Автор проекта',
    },
];

function PageAchivs() {
    const gridSize = {
        lg: 12,
        md: 12,
        sm: 6,
        xs: 6,
    }

    return (
        <AppProfile>
            <Typography level="h4" my={2}>
                Достижения
            </Typography>

            <Grid container spacing={3}>
                {achievements.map((achv, index) => (
                    <Grid xs={6} sm={4} md={4} lg={4} key={index}>
                        <Stack
                            alignItems="center"
                            spacing={1.5}
                            sx={{ textAlign: 'center' }}
                        >
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    border: '2px solid #e7ecf1',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'background.surface',
                                }}
                            >
                                {achv.icon}
                            </Box>
                            <Typography level="body-md" fontWeight="md">
                                {achv.title}
                            </Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </AppProfile>
    );
}

export default PageAchivs;
