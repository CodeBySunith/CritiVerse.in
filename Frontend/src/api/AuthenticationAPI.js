const baseUrl = 'http://localhost:8000'

export const LoginAPI = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (e) {
        return { success: false, msg: "Network error" }
    }
}

export const signupAPI = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (e) {
        return { success: false, msg: "Network error" }
    }
}

export const LogoutAPI = async () => {
    try {
        const res = await fetch(`${baseUrl}/user/logout`, {
            method: "POST",
            credentials: 'include'
        })
        return await res.json()
    } catch (e) {
        return { success: false, msg: "Network error" }
    }
}

export const VerifySessionAPI = async () => {
    try {
        const res = await fetch(`${baseUrl}/user/verify`, {
            method: "GET",
            credentials: 'include'
        })
        return await res.json()
    } catch (e) {
        return { success: false, msg: "Network error" }
    }
}
