import { IconButton } from "@mui/joy";
import { Phone } from "@phosphor-icons/react";
import { useCall } from "../../../app/CallProvider";

export default function ChatDisplayPhone({ bookmark = false, userToChat }) {
    const { startCall } = useCall();

    if (bookmark) return null;

    return (
        <IconButton
            variant="plain"
            color="neutral"
            onClick={() => startCall(userToChat)}
            sx={{ borderRadius: '50px' }}
        >
            <Phone size={20} />
        </IconButton>
    );
}
