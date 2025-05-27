import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


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

userSchema.pre("save" ,async  function (next) {
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
}
)

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User" , userSchema)