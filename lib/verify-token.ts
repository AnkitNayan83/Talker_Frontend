import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
    if (!token) return false;

    try {
        jwt.verify(token, process.env.JWT_SECRET || "");
        return true;
    } catch (error) {
        return false;
    }
};
