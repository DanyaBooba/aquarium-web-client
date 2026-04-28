import { Typography, Link } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import { Link as RouterLink } from 'react-router-dom';

function IconLogo({ color = '#000', width = '86', height = '53' }) {
    return (
        <svg width={width} height={height} viewBox="0 0 86 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2764 23.838C37.1592 -5.31896 72.3653 -4.06028 85.0967 8.17103C85.0967 8.17103 83.243 26.5241 59.7959 36.6535C42.5192 44.0965 25.7061 36.257 25.7061 36.257C23.316 39.7951 22.3601 46.9812 11.1484 52.0958L15.1025 33.0255C13.1076 31.4021 7.29404 26.6668 0 20.715C10.8639 17.962 15.6112 21.4314 21.2764 23.838ZM62.0166 4.94349C58.9352 4.94349 56.4365 7.44115 56.4365 10.5226C56.4366 13.604 58.9352 16.1017 62.0166 16.1017C65.0979 16.1015 67.5957 13.6039 67.5957 10.5226C67.5957 7.44127 65.0979 4.94368 62.0166 4.94349Z"
                fill={color}
                style={{
                    transform: 'translateY(4px)'
                }}
            />
        </svg>
    )
}

function Logo({ link = "/feed", style }) {
    const theme = useTheme();

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
                startDecorator={<IconLogo width='48' color={theme.colors.logo} />}
                sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: theme.colors.logo + "!important",
                    userSelect: 'none !important',
                }}
            >
                Аквариум
            </Typography>
        </Link>
    );
}

export default Logo
