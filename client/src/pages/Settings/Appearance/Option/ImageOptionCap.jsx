import { Box, Sheet } from "@mui/joy";

export default function ImageOptionCap({ src = '', active = false, onClick = () => { } }) {
    const borderColor = active ? '#1976d2' : 'transparent';
    const hoverBorderColor = active ? '#1976d2' : '#1976d288';

    return (
        <Sheet
            onClick={() => {
                onClick(src)
            }}
            sx={{
                border: `2px solid ${borderColor}`,
                '&:hover': {
                    borderColor: hoverBorderColor,
                },
                borderRadius: '12px',
                overflow: 'hidden',
                width: '265px',
                height: '153px',
                cursor: 'pointer',
                flexShrink: 0,
            }}
        >
            <Box
                component="img"
                src={src}
                alt="option"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </Sheet>
    );
}
