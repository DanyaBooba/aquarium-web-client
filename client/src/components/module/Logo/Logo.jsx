import { Typography, Link } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import { Link as RouterLink } from 'react-router-dom';
import { randomLogoText } from '../../../utils/randomLogoText';

function Logo({ link = "/feed", noLink = false, style, noRandom = true }) {
    let mini = "мини";

    if (!noRandom) {
        mini = randomLogoText();
    }

    const theme = useTheme();

    if (noLink) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', ...style }}>
                <Typography
                    component="span"
                    color="primary"
                    level="title-lg"
                    sx={{
                        position: 'relative',
                        textDecoration: 'none',
                        color: theme.colors.logo + "!important",
                        userSelect: 'none !important'
                    }}
                >
                    аквариум
                </Typography>
                <Typography
                    component="span"
                    color="primary"
                    level="title-lg"
                    variant="solid"
                    sx={{
                        ml: 0.75,
                        px: 0.75,
                        pt: 0,
                        backgroundColor: theme.colors.logo + "!important",
                        borderRadius: '4px',
                        textDecoration: 'none !important',
                        userSelect: 'none !important',
                        color: theme.colors.logoText + "!important",
                        fontSize: '17px !important'
                    }}
                >
                    <i>{mini}</i>
                </Typography>
            </div>
        );
    }

    return (
        <Link
            component={RouterLink}
            to={link}
            style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                width: 'fit-content',
                ...style
            }}
        >
            <Typography
                component="span"
                color="primary"
                level="title-lg"
                sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: theme.colors.logo + "!important",
                    userSelect: 'none !important',
                }}
            >
                аквариум
            </Typography>
            <Typography
                component="span"
                color="primary"
                level="title-lg"
                variant="solid"
                sx={{
                    ml: 0.75,
                    px: 0.75,
                    pt: 0,
                    backgroundColor: theme.colors.logo + "!important",
                    borderRadius: '4px',
                    textDecoration: 'none !important',
                    cursor: 'pointer',
                    userSelect: 'none !important',
                    fontSize: '17px !important',
                    color: theme.colors.logoText + "!important",
                    '&:hover': {
                        textDecoration: 'none !important',
                    },
                }}
            >
                <i>{mini}</i>
            </Typography>
        </Link>
    );
}

export default Logo
