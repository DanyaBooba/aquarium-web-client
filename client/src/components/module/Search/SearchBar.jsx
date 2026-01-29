import { Input, Box } from '@mui/joy'

function SearchBar({ value, onChange, sx }) {
    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 200,
                backdropFilter: 'blur(12px)',
                mx: -3,
                py: 2,
                '@media (max-width:600px)': {
                    width: '100vw'
                },
                overflowX: 'hidden',
                ...sx
            }}
        >
            <Box sx={{
                '@media (max-width:600px)': {
                    pl: '26px',
                    pr: '10px'
                },
                '@media (min-width: 600px)': {
                    pl: 3,
                    pr: 3,
                }
            }}>
                <Input
                    type="search"
                    variant="outlined"
                    placeholder="Введите запрос..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: '50px',
                        boxShadow: 'none',
                    }}
                />
            </Box>
        </Box>
    )
}

export default SearchBar
