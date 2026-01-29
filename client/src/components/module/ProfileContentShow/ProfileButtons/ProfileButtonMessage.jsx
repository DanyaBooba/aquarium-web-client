import { Button } from "@mui/joy";
import { ChatCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function ProfileButtonMessage({ id = 0, disabled = false }) {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(`/chat/${id}`)}
            startDecorator={<ChatCircle size={20} />}
            variant="soft"
            sx={(theme) => ({
                px: 2,
                py: 1,
                borderRadius: "50px",
                maxHeight: '37px !important',
                height: '37px !important',
                color: theme.palette.mode === 'dark'
                    ? theme.palette.primary[100]
                    : null,
            })}
            disabled={disabled}
        >
            Сообщение
        </Button>
    )
}
