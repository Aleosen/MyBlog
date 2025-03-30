const API_BASE_URL = '/api'

export const customFetch = async (url, options = {}) =>{
    const headers = {
        'Content-Type' : 'application/json',
        ...options.headers
    }
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers
    })
    if (!response.ok) {
        // Если сервер возвращает ошибку в JSON
        try {
            const error = await response.json();
            throw new Error(error.message || 'Ошибка сети');
        } catch (e) {
            // Если сервер вернул ошибку без JSON (например, текст или пустой ответ)
            throw new Error(await response.text() || 'Ошибка сети');
        }
    }
    const contentLength = response.headers.get('Content-Length');
    const isEmptyResponse = contentLength === '0' || response.status === 204;

    if (isEmptyResponse) {
        return null;
    }

    try {
        return await response.json();
    } catch (e) {
        console.warn('Невалидный JSON в ответе:', e);
        return null;
    }
}