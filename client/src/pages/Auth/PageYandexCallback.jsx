import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PageYandexCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("accessToken", token);
        }

        navigate("/feed", { replace: true });
    }, []);

    return null;
}
