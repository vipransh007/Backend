import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullname:{
        type: String,
        required: true,
        lowercase: true,
        index: true,
    },
    avatar:{
        type: String, //cloudinary
        required: true,
    },
    avatar:{
        type: String, //cloudinary
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref : "Video"
    }
],
    password: {
        Type: String,
        required: [true, "Password is Required"]
    },
    refreshTokens:{
        type: String
    }
}
, {
    timestamps:true
})

export const User = mongoose.model("User" , userSchema)