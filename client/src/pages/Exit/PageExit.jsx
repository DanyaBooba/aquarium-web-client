import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";

export default function PageExit() {
    const handleLogout = useLogout();

    handleLogout();

    return <Navigate to="/" replace />;
}
