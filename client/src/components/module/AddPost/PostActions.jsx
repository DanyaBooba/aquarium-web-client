import { Box, Button, Typography } from '@mui/joy'

import {
    MAX_FILES
} from '../../../config/configPost'

function PostActions({ attachments, isDisabled, loading, error, handleSubmit, handleDrawSubmit }) {
    return (
        <Box>
            {attachments.length > 0 && (
                <Typography level="body-sm" sx={{ pl: '12px' }}>
                    {`${attachments.length}/${MAX_FILES} файл(ов) добавлено`}
                </Typography>
            )}

            <Button
                onClick={handleSubmit}
                disabled={isDisabled}
                loading={loading}
                error={error}
                sx={{ borderRadius: '50px', px: 2, py: 1.5, width: '100%', mt: 2 }}
            >
                Опубликовать
            </Button>
            <Button
                onClick={handleDrawSubmit}
                disabled={isDisabled}
                loading={loading}
                error={error}
                variant="outlined"
                color="neutral"
                sx={{ borderRadius: '50px', px: 1.5, py: 1.3, width: '100%', mt: 1 }}
            >
                Сохранить черновик
            </Button>
        </Box>
    )
}

export default PostActions
