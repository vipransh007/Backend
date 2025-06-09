import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async(userId) =>
{
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken ()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return {refreshToken, accessToken};

        
    } catch (error) {
        res.status(500).json({message : "Something Went Wrong while generating refresh and access token"})

    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    console.log("email:", email);

    if ([fullName, email, username, password].some(field => !field?.trim())) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
        $or: [{ username: username.toLowerCase() }, { email }]
    });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    console.log(avatarLocalPath);
    
    if (!avatarLocalPath) {
        return res.status(400).json({ message: "Avatar is required" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if (!avatar?.url) {
        return res.status(400).json({ message: "Avatar upload failed" });
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    return res.status(201).json({
        message: "User registered successfully",
        user: createdUser
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!(username || email)) {
        return res.status(400).json({ message: "Fields are required" });
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        return res.status(404).json({ message: "User Does Not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Email or Username does not exist" });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = { 
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            user: loggedInUser
        });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshTokens: undefined
        }
    });

    const options = {
        httpOnly: true,
        secure: true
    };

    res
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .status(200)
        .json({ message: "User Logged Out" });
});

const refreshAccessToken = asyncHandler(async(req, res)=> {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        res.status(401).json({message : "Unauthorized Token "})
    }
 try {
       const decodedToken = jwt.verify(incomingRefreshToken , 
           process.env.REFRESH_TOKEN_SECRET
       )
   
       const user = await User.findById(decodedToken?._id)
   
       if(!user){
           res.status(401).json({message: "Invalid Refresh Token "})
       }
       if(incomingRefreshToken !== user?.refreshTokens){
           res.status(401).json({message: "Token is Expired or used"})
       }
   
       const options = { 
           httpOnly : true,
           secure : true
       }
      const { newRefreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);
   
   return res
       .status(200)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", newRefreshToken, options)
       .json({
           accessToken,
           refreshToken: newRefreshToken,
           message: "Access token refreshed"
       });
 } catch (error) {
    res.status(401).json({message : error?.meesage || "Invalid Refresh Token "})
 }
})

export {loginUser,logoutUser,registerUser, refreshAccessToken};