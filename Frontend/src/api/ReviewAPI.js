const baseUrl = 'http://localhost:8000'

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

export const GetGameReviewsAPI = async (gameId, page = 1) => {
  try {
    const res = await fetch(`${baseUrl}/review/gamereviews/${gameId}?page=${page}`);
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


export const DeleteMyReviewAPI = async (gameId) => {
  try {
    const res = await fetch(`${baseUrl}/review/deletereview/${gameId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`Server Error: ${res.status}`, data);
      return { success: false, msg: data.msg || "Error deleting review" };
    }

    return { success: true, ...data };
  } catch (e) {
    console.error("Fetch operation failed:", e);
    return { success: false, msg: "Network error" };
  }
};



export const ReportReviewAPI = async (reviewId, reason) => {
  try {
    const res = await fetch(`${baseUrl}/review/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reviewId, reason }),
    });

    return await res.json();
  } catch (err) {
    return { msg: "Failed to report review" };
  }
};


export const CheckReportAPI = async (reviewId) => {
  try {
    const res = await fetch(
      `${baseUrl}/review/checkreport/${reviewId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await res.json();
  } catch (err) {
    return { reported: false };
  }
};

