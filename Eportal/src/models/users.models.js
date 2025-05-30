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


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email: this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
       return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User" , userSchema)