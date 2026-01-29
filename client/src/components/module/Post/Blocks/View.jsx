import { Typography, Stack } from '@mui/joy'
import { Eye } from '@phosphor-icons/react'

function View({ views = 0 }) {
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <Eye size={20} />
            <Typography level="body-xs">{views ?? 0}</Typography>
        </Stack>
    )
}

export default View
