const baseUrl = 'http://localhost:8000';

export const GetProfileAPI = async () => {
    const res = await fetch(
        `${baseUrl}/user/profile`,
        {
            credentials: 'include'
        }
    );

    return await res.json();
};

export const UpdateProfileAPI = async (data) => {
    const res = await fetch(
        `${baseUrl}/user/profile/update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }
    );

    return await res.json();
};

export const ChangePasswordAPI = async (
    oldPassword,
    newPassword
) => {

    const res = await fetch(
        `${baseUrl}/user/profile/password`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                oldPassword,
                newPassword
            })
        }
    );

    return await res.json();
};

export const DeleteAccountAPI = async () => {
    const res = await fetch(
        `${baseUrl}/user/profile/delete`,
        {
            method: "DELETE",
            credentials: "include"
        }
    );

    return await res.json();
};