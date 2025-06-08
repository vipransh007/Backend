import { verify } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/users.models";


export const verifyJWT = asyncHandler(async(req , res, next)=> {
   try {
     const token = req.cookies?.accesToken || req.header("Authorization")?.replace("Bearer", "")
 
     if(!token){
         res.status(401).json({message:"Unauthorized Request"});
     }
 
     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
 const user =  await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user){
         res.status(401).json({message : "Invalid Acces Token"});
 
 
         req.user = user;
         next();
     }
   } catch (error) {
    console.log(error);
   }
})


