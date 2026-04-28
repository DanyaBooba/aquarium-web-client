import { Box, Button, Typography } from "@mui/joy";

export default function ServerError({
    img = "server-error.svg",
    title = "Ошибка сервера",
    desc = "Не удалось получить ответ от сервера, попробуйте позже",
    showButton = false,
    button = {},
    sx = {}
}) {
    const boxSx = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        mb: '1rem',
        mt: '3rem',
        textAlign: 'center',
        '& img': {
            maxWidth: '200px',
            width: '100%',
            height: 'auto',
            mx: 'auto',
            mb: '1rem',
        },
        ...sx
    }

    return (
        <Box sx={boxSx}>
            <img src={`/img/illustrations/${img}`} alt={title} />
            <Typography level="title-lg">
                {title}
            </Typography>
            <Typography>
                {desc}
            </Typography>
            {showButton && (
                <Button
                    component="a"
                    href={button?.href}
                    type="submit"
                    sx={{
                        borderRadius: '50px',
                        px: 3,
                        py: 1,
                        mx: 'auto',
                        fontSize: '16px',
                        textDecoration: 'none !important'
                    }}
                >
                    {button?.name}
                </Button>
            )}
        </Box>
    )
}

export function NotFound({
    img = "not-found.svg",
    title = "Записи не найдены",
    desc = "",
    buttonShow = false,
    buttonName = "",
    buttonLink = "",
    sx = {}
}) {
    let button = {}

    if (buttonShow) {
        button.name = buttonName
        button.href = buttonLink
    }

    return (
        <ServerError
            img={img}
            title={title}
            desc={desc}
            showButton={buttonShow}
            button={button ?? {}}
            sx={sx}
        />
    )
}
