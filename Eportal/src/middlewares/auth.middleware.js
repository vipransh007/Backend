import { verify } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJWY = asyncHandler(async(req , res, next)=> {
    req.cookies?.accesToken || req.header("Authorization")
})