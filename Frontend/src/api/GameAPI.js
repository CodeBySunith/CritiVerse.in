const baseUrl = 'http://localhost:8000'

export const fetchSearchSuggestions = async (query) => {
  try {
    const response = await fetch(`${baseUrl}/game/search?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch suggestions");
    
    return await response.json(); 
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const NewGames = async () => {
    try {
        const res = await fetch(`${baseUrl}/game/newreleases`);
        
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


export const AllGames = async (filters) => {
  try {

    const { 
      page = 1, 
      platform = '', 
      genre = '', 
      rating = '', 
      year = '', 
      sortBy = '' 
    } = filters || {};

    const queryParams = new URLSearchParams({
      page: page.toString(),
      platform,
      genre,
      rating,
      year,
      sortBy
    }).toString();

    const res = await fetch(`${baseUrl}/game/showallgames?${queryParams}`);
    
    if (!res.ok) {
      console.error(`Server Response Error Status: ${res.status}`);
      return null;
    }
    
    return await res.json(); 

  } catch (e) {
    console.error("Game API fetch operation failure:", e);
    return null;
  }
};



export const TopGames = async () => {
  try{
    const res = await fetch(`${baseUrl}/game/showallgames`)
    if(!res.ok){
      console.error(`Server Error: ${res.status}`);
      return null;
    }
    return await res.json();
    } catch (e) {
        console.error("Fetch operation failed:", e);
        return null;
    }
}

export const GetSingleGame = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/game/singlegame/${id}`);
    if (!res.ok) {
      console.error(`Server Error: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error("Fetch single game operation failed:", e);
    return null;
  }
};
