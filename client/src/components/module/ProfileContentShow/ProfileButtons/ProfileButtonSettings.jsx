import { Button } from "@mui/joy";
import { Gear } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function ProfileButtonSettings() {
    const navigate = useNavigate();

    return (
        <Button
            startDecorator={<Gear size={20} />}
            variant="soft"
            onClick={() => navigate('/settings')}
            sx={(theme) => ({
                px: 2,
                py: 1,
                borderRadius: "50px",
                color: theme.palette.mode === 'dark'
                    ? theme.palette.primary[100]
                    : null,
            })}
        >
            Настройки
        </Button>
    )
}
