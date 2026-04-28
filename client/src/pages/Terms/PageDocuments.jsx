import { Container, Typography, Box, Card, CardContent } from '@mui/joy';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

const documents = [
    {
        title: "Политика конфиденциальности",
        to: "/legal/privacy",
    },
    {
        title: "Условия использования",
        to: "/legal/terms-of-service",
    },
    {
        title: "Согласие на обработку персональных данных",
        to: "/legal/data-processing",
    },
    {
        title: "Политика использования cookie",
        to: "/legal/cookies",
    },
];

export default function PageDocuments() {
    return (
        <Container maxWidth="xs" sx={{ py: { xs: 5, md: 8 } }}>
            <Link to="/" style={{ textDecoration: 'none', justifyContent: 'center', display: 'flex' }}>
                <Typography
                    startDecorator={<ArrowLeft size={20} />}
                    level="body-md"
                    sx={{ mb: 4, display: 'inline-flex', alignItems: 'center', gap: .5, '&:hover': { color: 'primary.plainColor' } }}
                >
                    На главную
                </Typography>
            </Link>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography level="h1" sx={{ mb: 2 }}>
                    Правовые документы
                </Typography>
                <Typography level="body-md" sx={{ color: 'text.tertiary', maxWidth: 520, mx: 'auto' }}>
                    Ознакомьтесь с документами, которые регулируют использование сервиса «Аквариум»
                </Typography>
            </Box>

            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                className="cards-group"
            >
                {documents.map((doc, index) => (
                    <Card
                        key={index}
                        component={Link}
                        to={doc.to}
                        sx={{
                            textDecoration: 'none !important',
                            border: 'none',
                            borderRadius: '100px',
                            transition: 'opacity .25s',

                            '.cards-group:has(&:hover) &:not(:hover)': {
                                opacity: 0.4,
                            },
                        }}
                    >
                        <CardContent orientation="horizontal" sx={{ alignItems: 'center' }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography level="title-lg" sx={{ textAlign: 'center' }}>
                                    {doc.title}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Typography level="body-xs" sx={{ textAlign: 'center', mt: 7, color: 'text.tertiary' }}>
                Все документы актуальны на март 2026 г.
            </Typography>
        </Container>
    );
}
