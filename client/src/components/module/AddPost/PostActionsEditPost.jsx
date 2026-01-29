import { Box, Button, Typography } from '@mui/joy'

import {
    MAX_FILES
} from '../../../config/configPost'

function PostActionsEditPost({ countFiles, isDisabled, loading, error, handleSubmit, handleDrawSubmit, handleDeletePost }) {
    return (
        <Box>
            {countFiles > 0 && (
                <Typography level="body-sm">
                    {`${countFiles}/${MAX_FILES} файл(ов) добавлено`}
                </Typography>
            )}

            <Button
                onClick={handleSubmit}
                disabled={isDisabled}
                loading={loading}
                error={error}
                sx={{ borderRadius: '50px', px: 2, py: 1.5, width: '100%', mt: 2 }}
            >
                Изменить
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
                Сделать черновиком
            </Button>
            <Button
                onClick={handleDeletePost}
                disabled={isDisabled}
                loading={loading}
                error={error}
                variant="plain"
                color="danger"
                sx={{ borderRadius: '50px', px: 1.5, py: 1.3, width: '100%', mt: 1 }}
            >
                Удалить
            </Button>
        </Box>
    )
}

export default PostActionsEditPost
