import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export const VerifyToken = (token: string | undefined) => {
    if (!token) return false;
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};
