import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/users.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    console.log("email:", email);

    // Check if all required fields are present and non-empty
    if ([fullName, email, username, password].some(field => !field?.trim())) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // TODO:
    // 1. Check if user already exists by username/email
    // 2. Handle avatar file if provided (req.file)
    // 3. Upload avatar to Cloudinary
    // 4. Hash password
    // 5. Create user in DB
    // 6. Exclude password & tokens in response
    const exitedUser = User.findOne({
        $or : [{username}, {email}]
    })
    if(exitedUser){
        res.status(409).json({message: "User Already Exist"});
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        res.status(400).json({message: "Avatar is Missing"})
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        res.status(400).json({message: "Avatar is Missing"})
    }


    User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password
        ,username:username.toLoweCase()
    })

    // res.status(200).json({ message: "Validation passed, implement remaining logic" });
});

export { registerUser };
