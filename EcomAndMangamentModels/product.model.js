import mongoose from "mongoose";
import { Category } from "./category.model";

const productsSchema = new mongoose.Schema({
    description:{
        required: true,
        type: String,
    },
    name:{
        required: true,
        type: String
    },
    productImage:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        default:0,
    },
    stock:{
        type:Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required: true,
    }
    ,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Products = mongoose.model("Products", productsSchema )