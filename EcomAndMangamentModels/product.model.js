import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({},{timestamps:true})

export const Products = mongoose.model("Products", productsSchema)