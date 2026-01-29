import { Sheet } from "@mui/joy";
import { Plus } from "@phosphor-icons/react";

export default function ImageOptionLoadAvatar({ onClick = () => { } }) {
    return (
        <Sheet
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                width: 80,
                height: 80,
                borderRadius: '50%',

                border: '2px dashed',
                borderColor: 'neutral.outlinedBorder',

                color: 'neutral.500',
                cursor: 'pointer',
                flexShrink: 0,

                '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder',
                    backgroundColor: 'neutral.softHoverBg',
                },
            }}
        >
            <Plus size={24} />
        </Sheet>
    );
}
