import { getCsrfToken } from './getCsrfToken';

const CACHE_TTL_MS = 20_000; // результат проверки живёт 20 секунд

let inFlight = null;   // текущий запрос в процессе
let lastResult = null; // { data, ts } — последний результат
let lastToken = null;  // access token, для которого был сделан запрос

/**
 * Единая точка вызова /auth/check.
 * Если проверка уже идёт — возвращает тот же промис вместо нового запроса.
 * Если результат свежий и токен тот же — возвращает кеш без запроса.
 */
export async function checkAuth() {
    const accessToken = localStorage.getItem('accessToken');

    // Кеш: тот же токен и результат ещё свежий
    if (
        lastResult &&
        lastToken === accessToken &&
        Date.now() - lastResult.ts < CACHE_TTL_MS
    ) {
        return lastResult.data;
    }

    // Дедупликация: если запрос уже в процессе — ждём его
    if (inFlight) return inFlight;

    inFlight = (async () => {
        try {
            const csrf = await getCsrfToken();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/check`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-CSRF-Token': csrf,
                },
            });

            const data = await response.json();

            if (data.status === 'unvalid' && data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }

            if (data.status === 'deleted') {
                localStorage.removeItem('accessToken');
            }

            lastToken = data.status === 'unvalid' ? data.accessToken : accessToken;
            lastResult = { data, ts: Date.now() };

            return data;
        } finally {
            inFlight = null;
        }
    })();

    return inFlight;
}

/** Сбросить кеш — вызывать при логауте */
export function resetAuthCache() {
    inFlight = null;
    lastResult = null;
    lastToken = null;
}
