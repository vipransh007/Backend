import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

export { registerUser };
