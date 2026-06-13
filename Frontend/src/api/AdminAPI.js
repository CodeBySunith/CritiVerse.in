const baseUrl = 'http://localhost:8000'

export const ReviewCountAPI = async () => {
  try {

    const res = await fetch(`${baseUrl}/review/reviewcount`)
    if (!res.ok) {
            console.error(`Server Error: ${res.status}`);
            return null;
        }
    
    return await res.json(); 

  } catch (e) {
        console.error("Fetch operation failed:", e);
        return null;
    }
};

export const UserCountAPI = async () => {
  try {

    const res = await fetch(`${baseUrl}/user/usercount`)
    if (!res.ok) {
            console.error(`Server Error: ${res.status}`);
            return null;
        }
    
    return await res.json(); 

  } catch (e) {
        console.error("Fetch operation failed:", e);
        return null;
    }
};


export const GameCountAPI = async () => {
  try {

    const res = await fetch(`${baseUrl}/game/gamecount`)
    if (!res.ok) {
            console.error(`Server Error: ${res.status}`);
            return null;
        }
    
    return await res.json(); 

  } catch (e) {
        console.error("Fetch operation failed:", e);
        return null;
    }
};


export const AddGameFromRAWGAPI = async (rawgId) => {
    const res = await fetch(`${baseUrl}/game/addgamesAPI`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ rawgId })
    });

    return res.json();
};


export const GetAllUsersAPI = async (page = 1) => {
  try {
    const res = await fetch(`${baseUrl}/user/getallusers?page=${page}`);
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch users", e);
    return { users: [], totalpages: 1 };
  }
};

export const GetAllGamesAdminAPI = async (page = 1) => {
  try {
    const res = await fetch(`${baseUrl}/game/showallgamesadmin?page=${page}`, {
      method: 'GET'
    });

    return await res.json();
  } catch (e) {
    console.error("Failed to fetch games", e);
    return { games: [], totalpages: 1 };
  }
};


export const DeleteGameAPI = async (gameId) => {
    try {
        const res = await fetch(`${baseUrl}/game/deletegame/${gameId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return await res.json();
    } catch (e) {
        return { message: "Network error occurred." };
    }
};


export const ToggleBanUserAPI = async (userId) => {
    try {
        const res = await fetch(`${baseUrl}/user/toggleban/${userId}`, {
            method: 'PUT',
            credentials: 'include'
        });
        return await res.json();
    } catch (e) { return { msg: "Network error occurred." }; }
};