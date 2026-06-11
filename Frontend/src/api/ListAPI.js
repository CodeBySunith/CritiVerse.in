const baseUrl = 'http://localhost:8000';

export const GetGameTrackingAPI = async (gameId) => {
    const res = await fetch(`${baseUrl}/list/status/${gameId}`, { credentials: 'include' });
    return await res.json();
};

export const ToggleStatusAPI = async (gameId, targetStatus) => {
    const res = await fetch(`${baseUrl}/list/toggle-status/${gameId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ targetStatus })
    });
    return await res.json();
};

export const ToggleFavoriteAPI = async (gameId) => {
    const res = await fetch(`${baseUrl}/list/toggle-fav/${gameId}`, {
        method: "POST",
        credentials: 'include'
    });
    return await res.json();
};

export const GetMyListAPI = async () => {

    const res = await fetch(
        `${baseUrl}/list/mylist`,
        {
            credentials: 'include'
        }
    );

    return await res.json();
};
