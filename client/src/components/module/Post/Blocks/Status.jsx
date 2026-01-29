import { Box, Chip } from '@mui/joy';

function Status({ status }) {
    if (status <= 0) {
        return (
            <Box>
                {status === 0 && (
                    <Chip
                        color="neutral"
                        size="sm"
                        variant="outlined"
                    >
                        Черновик
                    </Chip>
                )}
                {status === -1 && (
                    <Chip
                        color="primary"
                        size="sm"
                        variant="outlined"
                    >
                        На модерации
                    </Chip>
                )}
                {status === -2 && (
                    <Chip
                        color="danger"
                        size="sm"
                        variant="outlined"
                    >
                        Отклонено
                    </Chip>
                )}
            </Box>
        )
    }
}

export default Status;
