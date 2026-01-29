import { apiFetch } from "./apiClient";

export const apiSendMessage = async (userIdTo, content) => {
    const response = await apiFetch(`https://mini.aquarium.org.ru/api/messages/${userIdTo}/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
        })
    });

    return true;
};
