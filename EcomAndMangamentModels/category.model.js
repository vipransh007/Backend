import mongoose from "mongoose";

const categorySchema =  new mongoose.Schema({

    namea:{
        type : String,
        required: true,
        lowercase:true,
    },
}
,{timestamps:true})

export const Category = mongoose.model("Category", categorySchema)