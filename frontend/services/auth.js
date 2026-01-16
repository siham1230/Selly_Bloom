import { instance } from "../services/instance";
// import { useAuthStore } from "../store/authStore";

export const registerUser = async (fullName, email, password) => {
    try {
        const res = await instance.post("api/auth/register", {
            name: fullName,
            email,
            password,
            role: 'user'

        });
        const { token, user } = res.data;
        // useAuthStore.getState().setAuth(token, user);

        return {
            success: true,
            data: { user, token }
        };
    } catch (error) {

        return {
            success: false,
            message:
                error.response?.data?.error ||
                "Server error",
        };
    }

};
export const loginUser = async (email, password) => {
    try {
        const res = await instance.post("api/auth/login", {
            email,
            password,
        });
        const { token, user } = res.data;
        // useAuthStore.getState().setAuth(token, user);

        return {
            success: true,
            data: { user, token }
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.error || "Invalid credentials",
        };
    }
};

export const getCurrentUser = async (token) => {
    try {
        const res = await instance.get("api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            data: res.data.user
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.error || "Failed to get user",
        };
    }
};

export const updateProfil = async (token, name, email) => {
    try {
        const res = await instance.put("api/auth/profil",
            { name, email },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return {
            success: true,
            data: res.data.user,
            message: res.data.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.error || "Failed to update profile",
        };
    }
};

export const changePassword = async (token, currentPassword, newPassword) => {
    try {
        const res = await instance.put("api/auth/change-password",
            { currentPassword, newPassword },
            {
                header: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return {
            success: true,
            message: res.data.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.error || "Failed to change Password",
        };
    }
};

export const logoutUser = async (token) => {
    try {
        const res = await instance.post("api/auth/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            message: res.data.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.error || "Logout failed",
        };
    }
};