import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Request: Token not provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token: User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("JWT verification error:", error.message);
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
});
