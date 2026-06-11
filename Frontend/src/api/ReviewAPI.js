const baseUrl = 'http://localhost:8000'

export const NewReviews = async () => {
  try {
    const res = await fetch(`${baseUrl}/review/newreviews`)
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

export const GetMyGameReview = async (gameId) => {
    try {
        const response = await fetch(`${baseUrl}/review/myreview/${gameId}`, {
            method: "GET",
            credentials: 'include' 
        });
        return await response.json();
    } catch (error) {
        console.error("Error in GetMyGameReview API execution:", error);
        return { success: false, msg: "API connection failed" };
    }
};


export const CreateReviewAPI = async (gameId, reviewText, ratingScore) => {
    try {
        const response = await fetch(`${baseUrl}/review/add/${gameId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ review: reviewText, rating: ratingScore })
        });
        const data = await response.json();
        return { success: response.ok, ...data };
    } catch (error) {
        return { success: false, msg: "Failed to submit rating" };
    }
};

export const EditReviewAPI = async (gameId, reviewText, ratingScore) => {
    try {
        const response = await fetch(`${baseUrl}/review/update/${gameId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ review: reviewText, rating: ratingScore })
        });
        const data = await response.json();
        return { success: response.ok, ...data };
    } catch (error) {
        return { success: false, msg: "Failed to update rating" };
    }
};

export const GetGameReviewsAPI = async (gameId) => {
  try {
    const res = await fetch(`${baseUrl}/review/gamereviews/${gameId}`);
    if (!res.ok) {
        console.error(`Server Error: ${res.status}`);
        return { gameReviews: [] };
    }
    return await res.json(); 
  } catch (e) {
    console.error("Fetch operation failed:", e);
    return { gameReviews: [] };
  }
};


export const GetMyReviewsAPI = async () => {

    const res = await fetch(
        `${baseUrl}/review/myallreviews`,
        {
            credentials: 'include'
        }
    );

    return await res.json();
};
