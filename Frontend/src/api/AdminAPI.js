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


export const GetAllUsersAPI = async (page = 1, search = "") => {
  try {
    const res = await fetch(
      `${baseUrl}/user/getallusers?page=${page}&search=${search}`
    );

    return await res.json();
  } catch (e) {
    console.error("Failed to fetch users", e);
    return { users: [], totalpages: 1 };
  }
};



export const GetAllGamesAdminAPI = async (page = 1, search = "") => {
  try {
    const res = await fetch(
      `${baseUrl}/game/showallgamesadmin?page=${page}&search=${search}`,
      { method: "GET" }
    );

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

export const GetAllReviewReportsAPI = async (page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/review/showreports?page=${page}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    
    return await res.json();
  } catch (err) {
    return { reports: [] };
  }
};


export const UpdateReportStatusAPI = async (reportId, status) => {
  const url = `${baseUrl}/review/reportstatus`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ reportId, status }),
  });

  const data = await res.json().catch(() => null);

  return data;
};

export const DeleteReportAPI = async (reportId) => {
  try {
    const res = await fetch(`${baseUrl}/review/report/${reportId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    return { msg: "Request failed" };
  }
};