import api from "@/lib/axiosInstance";

export const getUserById = async (id: string) => {
    try {
        if (!id) return null;

        const { data } = await api.get(`/user/${id}`);
        if (data.success) {
            return data.user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
