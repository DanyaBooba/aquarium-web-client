import { Select, Option } from '@mui/joy'

function PostTopicSelector({ topic, setTopic }) {
    return (
        <Select
            placeholder="Выберите тему"
            value={topic}
            onChange={(_, val) => setTopic(val)}
            variant="outlined"
            sx={{
                boxShadow: 'none',
                borderRadius: '50px',
                px: 2,
                py: 1.3,
                flex: '1',
                mb: 2,
                fontSize: '16px'
            }}
            slotProps={{
                listbox: {
                    sx: {
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px'
                    },
                },
            }}
        >
            <Option value="news">Новости</Option>
            <Option value="events">События</Option>
            <Option value="question">Вопрос</Option>
            <Option value="other">Другое</Option>
        </Select>
    )
}

export default PostTopicSelector
